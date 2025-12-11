export enum DocumentType {
  PRESCRIPTION = 'PRESCRIPTION', // Receita
  REPORT = 'REPORT', // Laudo
  EXAM = 'EXAM', // Exame
  OTHER = 'OTHER', // Outros
}

export const getDocumentTypeLabel = (type: DocumentType): string => {
  const labels = {
    [DocumentType.PRESCRIPTION]: 'Receita',
    [DocumentType.REPORT]: 'Laudo',
    [DocumentType.EXAM]: 'Exame',
    [DocumentType.OTHER]: 'Outros',
  }
  return labels[type]
}


