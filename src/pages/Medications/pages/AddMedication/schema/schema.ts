import * as yup from 'yup'

const validateDate = (value: string | undefined): boolean => {
  if (!value || value.length !== 10) return false

  const [day, month, year] = value.split('/').map(Number)

  if (day < 1 || day > 31) return false
  if (month < 1 || month > 12) return false
  if (year < 1900 || year > 2099) return false

  const date = new Date(year, month - 1, day)
  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    return false
  }

  return true
}

export const addMedicationSchema = yup.object({
  medication: yup
    .string()
    .required('O nome do remédio é obrigatório')
    .min(2, 'O nome deve ter no mínimo 2 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),

  dependent: yup
    .string()
    .required('O dependente é obrigatório'),

  doctor: yup
    .string()
    .required('O nome do médico é obrigatório')
    .min(3, 'O nome do médico deve ter no mínimo 3 caracteres')
    .max(100, 'O nome do médico deve ter no máximo 100 caracteres'),

  dosage: yup
    .string()
    .required('A dosagem é obrigatória')
    .min(1, 'A dosagem é obrigatória')
    .max(50, 'A dosagem deve ter no máximo 50 caracteres'),

  dateUntil: yup
    .string()
    .test(
      'date-format',
      'Data inválida. Use o formato DD/MM/YYYY',
      function (value) {
        const { continuousUse } = this.parent
        // Se for uso contínuo, a data não é obrigatória
        if (continuousUse) {
          return true
        }
        // Se não for uso contínuo, a data é obrigatória e deve ser válida
        if (!value || value.length === 0) {
          return this.createError({
            message: 'A data é obrigatória quando não é uso contínuo',
          })
        }
        return validateDate(value)
      }
    )
    .notRequired(),

  continuousUse: yup
    .boolean()
    .required('É necessário informar se é uso contínuo'),

  times: yup
    .array()
    .of(
      yup
        .string()
        .required('O horário é obrigatório')
        .matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de horário inválido (use HH:MM)')
    )
    .min(1, 'Adicione pelo menos um horário')
    .required('Os horários são obrigatórios'),

  comments: yup
    .string()
    .max(500, 'Os comentários devem ter no máximo 500 caracteres')
    .notRequired(),
})

export interface AddMedicationFormData {
  medication: string
  dependent: string
  doctor: string
  dosage: string
  dateUntil?: string
  continuousUse: boolean
  times: string[]
  comments?: string
}

