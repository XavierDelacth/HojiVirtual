import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface ProfileData {
  name: string;
  store_name: string;
  store_description: string;
  location: string;
  phone: string;
  email: string;
  bio: string;
  avatar_url: string;
  accountHolder?: string;
  bankName?: string;
  iban?: string;
}

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: () => void;
}

const EditProfileModal = ({ open, onOpenChange, onSave }: EditProfileModalProps) => {
  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    store_name: "",
    store_description: "",
    location: "",
    phone: "",
    email: "",
    bio: "",
    avatar_url: "",
    accountHolder: "",
    bankName: "",
    iban: "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Fetch profile data when modal opens
  useEffect(() => {
    if (open) {
      fetchProfile();
    }
  }, [open]);

  const fetchProfile = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setIsLoading(false);
      return;
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
      // Carregar do localStorage como fallback
      try {
        const raw = localStorage.getItem(`hoji_profile_${user.id}`);
        if (raw) {
          const profileLocal = JSON.parse(raw);
          setFormData({
            name: profileLocal.name || "",
            store_name: profileLocal.store_name || "",
            store_description: profileLocal.store_description || "",
            location: profileLocal.location || "",
            phone: profileLocal.phone || "",
            email: profileLocal.email || "",
            bio: profileLocal.bio || "",
            avatar_url: profileLocal.avatar_url || "",
            accountHolder: profileLocal.accountHolder || "",
            bankName: profileLocal.bankName || "",
            iban: profileLocal.iban || "",
          });
          setAvatarPreview(profileLocal.avatar_url || "");
          toast({
            title: "Aviso",
            description: "Perfil carregado do armazenamento local.",
          });
        }
      } catch (e) {
        console.error('Erro ao carregar perfil do armazenamento local', e);
        toast({
          title: "Erro",
          description: "Não foi possível carregar o perfil.",
          variant: "destructive",
        });
      }
    } else if (profile) {
      // Se houver sucesso, atualizar formData com os dados do Supabase
      // e mesclar com dados bancários do localStorage
      let bankDataFromLocal = {
        accountHolder: "",
        bankName: "",
        iban: "",
      };
      try {
        const raw = localStorage.getItem(`hoji_profile_${user.id}`);
        if (raw) {
          const profileLocal = JSON.parse(raw);
          bankDataFromLocal = {
            accountHolder: profileLocal.accountHolder || "",
            bankName: profileLocal.bankName || "",
            iban: profileLocal.iban || "",
          };
        }
      } catch (e) {
        console.error('Erro ao carregar dados bancários do localStorage', e);
      }

      setFormData({
        name: profile.name || "",
        store_name: profile.store_name || "",
        store_description: profile.store_description || "",
        location: profile.location || "",
        phone: profile.phone || "",
        email: profile.email || "",
        bio: profile.bio || "",
        avatar_url: profile.avatar_url || "",
        accountHolder: bankDataFromLocal.accountHolder,
        bankName: bankDataFromLocal.bankName,
        iban: bankDataFromLocal.iban,
      });
      setAvatarPreview(profile.avatar_url || "");
    } else {
      // Se não houver erro, mas também não houver dados (novo utilizador), tentar localStorage
      try {
        const raw = localStorage.getItem(`hoji_profile_${user.id}`);
        if (raw) {
          const profileLocal = JSON.parse(raw);
          setFormData({
            name: profileLocal.name || "",
            store_name: profileLocal.store_name || "",
            store_description: profileLocal.store_description || "",
            location: profileLocal.location || "",
            phone: profileLocal.phone || "",
            email: profileLocal.email || "",
            bio: profileLocal.bio || "",
            avatar_url: profileLocal.avatar_url || "",
            accountHolder: profileLocal.accountHolder || "",
            bankName: profileLocal.bankName || "",
            iban: profileLocal.iban || "",
          });
          setAvatarPreview(profileLocal.avatar_url || "");
        }
      } catch (e) {
        console.error('Erro ao carregar perfil do armazenamento local', e);
      }
    }
    
    setIsLoading(false);
  };

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Formato não suportado. Use JPEG, PNG, WebP ou GIF.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "A imagem deve ter no máximo 2MB.";
    }
    return null;
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para alterar a foto.",
        variant: "destructive",
      });
      return null;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar a imagem. Tente novamente.",
        variant: "destructive",
      });
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para salvar alterações.",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    let avatarUrl = formData.avatar_url;

    // Upload avatar if a new file was selected
    if (selectedFile) {
      const uploadedUrl = await uploadAvatar(selectedFile);
      if (uploadedUrl) {
        avatarUrl = uploadedUrl;
      }
    }

    // Validações dos dados bancários
    if (!formData.accountHolder || !formData.bankName || !formData.iban) {
      toast({
        title: 'Dados bancários incompletos',
        description: 'Preencha Titular da Conta, Banco e IBAN (obrigatório).',
        variant: 'destructive',
      });
      setIsSaving(false);
      return;
    }

    // IBAN Angola (AO) - validar prefixo
    if (!String(formData.iban).toUpperCase().startsWith('AO')) {
      toast({
        title: 'IBAN inválido',
        description: 'O IBAN deve começar com AO (Angola).',
        variant: 'destructive',
      });
      setIsSaving(false);
      return;
    }

    // Update profile in database (sem campos bancários enquanto schema não for atualizado)
    const { error } = await supabase
      .from('profiles')
      .update({
        name: formData.name,
        store_name: formData.store_name,
        store_description: formData.store_description,
        location: formData.location,
        phone: formData.phone,
        email: formData.email,
        bio: formData.bio,
        avatar_url: avatarUrl,
      })
      .eq('user_id', user.id);

    if (error) {
      console.error("Error updating profile:", error);
      // Tentar upsert como fallback (caso a linha não exista)
      try {
        const upsertPayload = {
          user_id: user.id,
          name: formData.name,
          store_name: formData.store_name,
          store_description: formData.store_description,
          location: formData.location,
          phone: formData.phone,
          email: formData.email,
          bio: formData.bio,
          avatar_url: avatarUrl,
        };

        const { error: upsertError } = await supabase
          .from('profiles')
          .upsert(upsertPayload, { onConflict: 'user_id' });

        if (!upsertError) {
          toast({
            title: "Perfil atualizado",
            description: "Suas alterações foram salvas (upsert).",
          });
          try {
            localStorage.setItem(`hoji_profile_${user.id}`, JSON.stringify(upsertPayload));
          } catch (e) {
            console.error('Falha ao persistir perfil localmente', e);
          }
          onSave?.();
          onOpenChange(false);
        } else {
          // Se upsert também falhar, persistir localmente e informar o utilizador
          console.error('Upsert falhou:', upsertError);
          try {
            localStorage.setItem(`hoji_profile_${user.id}`, JSON.stringify({
              name: formData.name,
              store_name: formData.store_name,
              store_description: formData.store_description,
              location: formData.location,
              phone: formData.phone,
              email: formData.email,
              bio: formData.bio,
              avatar_url: avatarUrl,
              accountHolder: formData.accountHolder,
              bankName: formData.bankName,
              iban: formData.iban,
            }));
          } catch (e) {
            console.error('Falha ao persistir perfil localmente', e);
          }
          toast({
            title: "Salvo localmente",
            description: "Backend indisponível — alterações guardadas localmente.",
          });
          onSave?.();
          onOpenChange(false);
        }
      } catch (e) {
        console.error('Erro no upsert/fallback:', e);
        try {
          localStorage.setItem(`hoji_profile_${user.id}`, JSON.stringify({
            name: formData.name,
            store_name: formData.store_name,
            store_description: formData.store_description,
            location: formData.location,
            phone: formData.phone,
            email: formData.email,
            bio: formData.bio,
            avatar_url: avatarUrl,
            accountHolder: formData.accountHolder,
            bankName: formData.bankName,
            iban: formData.iban,
          }));
        } catch (e2) {
          console.error('Falha ao persistir perfil localmente', e2);
        }
        toast({
          title: "Salvo localmente",
          description: "Backend indisponível — alterações guardadas localmente.",
        });
        onSave?.();
        onOpenChange(false);
      }
    } else {
      toast({
        title: "Perfil atualizado",
        description: "Suas alterações foram salvas com sucesso!",
      });
      // Persistir perfil local como fallback
      try {
        localStorage.setItem(`hoji_profile_${user.id}`, JSON.stringify({
          name: formData.name,
          store_name: formData.store_name,
          store_description: formData.store_description,
          location: formData.location,
          phone: formData.phone,
          email: formData.email,
          bio: formData.bio,
          avatar_url: avatarUrl,
          accountHolder: formData.accountHolder,
          bankName: formData.bankName,
          iban: formData.iban,
        }));
      } catch (e) {
        console.error('Falha ao persistir perfil localmente', e);
      }
      onSave?.();
      onOpenChange(false);
    }
    
    setIsSaving(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      toast({
        title: "Arquivo inválido",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const getInitials = () => {
    if (formData.name) return formData.name.charAt(0).toUpperCase();
    if (formData.store_name) return formData.store_name.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar/Photo Edit Section */}
            <div className="flex flex-col items-center gap-3 pb-4 border-b">
              <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage src={avatarPreview} alt="Foto de perfil" />
                  <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button type="button" variant="outline" size="sm" onClick={handleAvatarClick} disabled={isSaving}>
                <Camera className="w-4 h-4 mr-2" />
                Alterar Foto
              </Button>
              <p className="text-xs text-muted-foreground">
                JPEG, PNG, WebP ou GIF • Máx. 2MB
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Seu Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Seu nome completo"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={2}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Fale um pouco sobre você"
                maxLength={500}
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-3">Informações da Loja</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="store_name">Nome da Loja</Label>
                  <Input
                    id="store_name"
                    value={formData.store_name}
                    onChange={(e) => setFormData({ ...formData, store_name: e.target.value })}
                    placeholder="Nome da sua loja"
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store_description">Descrição da Loja</Label>
                  <Textarea
                    id="store_description"
                    rows={3}
                    value={formData.store_description}
                    onChange={(e) => setFormData({ ...formData, store_description: e.target.value })}
                    placeholder="Descreva sua loja e produtos"
                    maxLength={1000}
                  />
                </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountHolder">Titular da Conta (IBAN)</Label>
                    <Input
                      id="accountHolder"
                      value={formData.accountHolder}
                      onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                      placeholder="Nome do titular da conta"
                      maxLength={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankName">Banco</Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      placeholder="Nome do banco"
                      maxLength={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="iban">IBAN (começa com AO)</Label>
                    <Input
                      id="iban"
                      value={formData.iban}
                      onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                      placeholder="AO..."
                      maxLength={34}
                    />
                  </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Cidade, País"
                    maxLength={200}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+244 9XX XXX XXX"
                      maxLength={30}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@exemplo.com"
                      maxLength={255}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Alterações"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
