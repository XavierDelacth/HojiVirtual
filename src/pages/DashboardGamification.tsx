import { Trophy, Lock, Medal, TrendingUp } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { currentUser, badges } from "@/data/mockData";

const rankingData = [
  { position: 1, name: "João Pedro", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", sales: 89, points: 4500 },
  { position: 2, name: "Ana Costa", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", sales: 76, points: 3800 },
  { position: 3, name: "Maria Silva", avatar: currentUser.avatar, sales: 45, points: 2345, isCurrentUser: true },
  { position: 4, name: "Carlos Santos", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", sales: 38, points: 1900 },
  { position: 5, name: "Luísa Fernandes", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", sales: 32, points: 1600 },
];

const DashboardGamification = () => {
  const earnedBadges = badges.filter(b => b.earned);
  const pendingBadges = badges.filter(b => !b.earned);
  const nextBadgeProgress = 78;

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="lg:ml-64">
        <DashboardHeader title="Gamificação" />
        
        <main className="p-4 lg:p-8">
          {/* Points Card */}
          <Card className="mb-8 gradient-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <Medal className="w-16 h-16 mx-auto mb-4 opacity-90" />
              <h2 className="text-5xl font-bold mb-2">{currentUser.points.toLocaleString()}</h2>
              <p className="text-primary-foreground/80 text-lg">Pontos Acumulados</p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-background/20 rounded-full">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">Nível {currentUser.level}</span>
              </div>
              <p className="mt-4 text-sm text-primary-foreground/70">
                Os seus produtos aparecem em destaque nas buscas!
              </p>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Badges Section */}
            <div className="space-y-6">
              {/* Earned Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-secondary" />
                    Meus Badges ({earnedBadges.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {earnedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="flex flex-col items-center p-4 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl text-center"
                      >
                        <span className="text-4xl mb-2">{badge.icon}</span>
                        <span className="font-medium text-sm">{badge.name}</span>
                        <span className="text-xs text-muted-foreground mt-1">{badge.description}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    Badges Bloqueados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {pendingBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="flex flex-col items-center p-4 bg-muted/50 rounded-xl text-center opacity-60"
                      >
                        <div className="relative">
                          <span className="text-4xl mb-2 grayscale">{badge.icon}</span>
                          <Lock className="w-4 h-4 absolute -top-1 -right-1 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-sm mt-2">{badge.name}</span>
                        <span className="text-xs text-muted-foreground mt-1">{badge.description}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progress to Next Badge */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-3xl">💎</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Próximo Badge: Vendedor Premium</h3>
                      <p className="text-sm text-muted-foreground">{nextBadgeProgress}/100 vendas</p>
                    </div>
                  </div>
                  <Progress value={nextBadgeProgress} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Faltam apenas {100 - nextBadgeProgress} vendas para desbloquear!
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Ranking Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Ranking Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rankingData.map((user) => (
                    <div
                      key={user.position}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                        user.isCurrentUser
                          ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30"
                          : "bg-muted/50"
                      }`}
                    >
                      {/* Position */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        user.position === 1
                          ? "bg-secondary text-secondary-foreground"
                          : user.position === 2
                          ? "bg-muted-foreground/30 text-foreground"
                          : user.position === 3
                          ? "bg-orange-400/80 text-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {user.position === 1 ? "🥇" : user.position === 2 ? "🥈" : user.position === 3 ? "🥉" : user.position}
                      </div>

                      {/* Avatar */}
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{user.name}</span>
                          {user.isCurrentUser && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                              Você
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.sales} vendas</p>
                      </div>

                      {/* Points */}
                      <div className="text-right">
                        <span className="font-bold text-primary">{user.points.toLocaleString()}</span>
                        <p className="text-xs text-muted-foreground">pontos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardGamification;
