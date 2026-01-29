import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PurchaseReceipt {
  productName: string;
  vendorName: string;
  buyerName: string;
  value: number;
  date: string;
  time: string;
  reference: string;
  iban: string;
  bankName: string;
}

export const generateReceiptPDF = (receipt: PurchaseReceipt) => {
  // Create a temporary div to render the receipt
  const receiptDiv = document.createElement('div');
  receiptDiv.style.width = '210mm';
  receiptDiv.style.padding = '20px';
  receiptDiv.style.backgroundColor = 'white';
  receiptDiv.style.fontFamily = 'Arial, sans-serif';
  receiptDiv.style.position = 'absolute';
  receiptDiv.style.left = '-9999px';

  receiptDiv.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 15px;">
        <h1 style="margin: 0; font-size: 24px; color: #333;">COMPROVATIVO DE COMPRA</h1>
        <p style="margin: 5px 0; font-size: 14px; color: #666;">HojiVirtual - Mercado Digital</p>
      </div>

      <!-- Purchase Details -->
      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 14px; margin-bottom: 10px; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Detalhes da Compra</h3>
        <table style="width: 100%; font-size: 13px; line-height: 1.8;">
          <tr>
            <td style="font-weight: bold; width: 40%; color: #666;">Produto:</td>
            <td style="color: #333;">${receipt.productName}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="font-weight: bold; color: #666;">Vendedor:</td>
            <td style="color: #333;">${receipt.vendorName}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #666;">Comprador:</td>
            <td style="color: #333;">${receipt.buyerName}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="font-weight: bold; color: #666;">Data:</td>
            <td style="color: #333;">${receipt.date} ${receipt.time}</td>
          </tr>
        </table>
      </div>

      <!-- Amount -->
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f0f0f0; border-radius: 5px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #666;">VALOR DA COMPRA</p>
        <p style="margin: 10px 0 0 0; font-size: 28px; font-weight: bold; color: #333;">${receipt.value.toLocaleString('pt-AO')} Kz</p>
      </div>

      <!-- Payment Reference -->
      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 14px; margin-bottom: 10px; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Referência da Compra</h3>
        <div style="font-size: 16px; font-weight: bold; color: #333; text-align: center; padding: 10px; background-color: #f9f9f9; border-radius: 5px; font-family: monospace;">
          ${receipt.reference}
        </div>
        <p style="margin: 10px 0 0 0; font-size: 12px; color: #666; text-align: center;">
          Use esta referência para identificar a compra
        </p>
      </div>

      <!-- IBAN Details -->
      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 14px; margin-bottom: 10px; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Dados para Pagamento</h3>
        <table style="width: 100%; font-size: 13px; line-height: 1.8;">
          <tr>
            <td style="font-weight: bold; width: 40%; color: #666;">Banco:</td>
            <td style="color: #333;">${receipt.bankName}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="font-weight: bold; color: #666;">IBAN:</td>
            <td style="color: #333; font-family: monospace;">${receipt.iban}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; color: #666;">Beneficiário:</td>
            <td style="color: #333;">${receipt.vendorName}</td>
          </tr>
        </table>
      </div>

      <!-- Status Message -->
      <div style="padding: 15px; background-color: #e8f5e9; border-left: 4px solid #4caf50; border-radius: 5px; margin-bottom: 20px;">
        <p style="margin: 0; color: #2e7d32; font-weight: bold;">✓ Compra Realizada com Sucesso</p>
        <p style="margin: 5px 0 0 0; font-size: 12px; color: #558b2f;">O comprovativo foi gerado com sucesso.</p>
      </div>

      <!-- Footer -->
      <div style="text-align: center; border-top: 1px solid #ccc; padding-top: 15px; margin-top: 30px;">
        <p style="margin: 0; font-size: 12px; color: #999;">HojiVirtual © 2026 - Mercado Digital de Angola</p>
        <p style="margin: 5px 0 0 0; font-size: 11px; color: #999;">Este comprovativo é válido como prova de compra</p>
      </div>
    </div>
  `;

  document.body.appendChild(receiptDiv);

  // Convert to canvas and PDF
  html2canvas(receiptDiv, {
    backgroundColor: '#ffffff',
    scale: 2,
  }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Download the PDF
    pdf.save(`Comprovativo-${receipt.reference}.pdf`);

    // Clean up
    document.body.removeChild(receiptDiv);
  }).catch((error) => {
    console.error('Error generating PDF:', error);
    document.body.removeChild(receiptDiv);
    
    // Fallback: Download as JSON
    downloadAsJSON(receipt);
  });
};

const downloadAsJSON = (receipt: PurchaseReceipt) => {
  const dataStr = JSON.stringify(receipt, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Comprovativo-${receipt.reference}.json`;
  link.click();
  URL.revokeObjectURL(url);
};
