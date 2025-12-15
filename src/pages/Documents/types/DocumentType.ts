export const DocumentType = {
  PRESCRIPTION: 'PRESCRIPTION',
  REPORT: 'REPORT',
  EXAM: 'EXAM',
  OTHER: 'OTHER',
} as const

export type DocumentType = typeof DocumentType[keyof typeof DocumentType]

export const getDocumentTypeLabel = (type: DocumentType): string => {
  const labels: Record<DocumentType, string> = {
    [DocumentType.PRESCRIPTION]: 'Receita',
    [DocumentType.REPORT]: 'Laudo',
    [DocumentType.EXAM]: 'Exame',
    [DocumentType.OTHER]: 'Outros',
  }
  return labels[type]
}
