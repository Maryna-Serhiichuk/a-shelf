export function checkRequireFields<T>(values: Partial<T>, fields: Array<keyof T>) {
  const errors: Partial<Record<keyof T, string>> = {}

  const requiredFields: Array<keyof T> = fields

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required field'
    }
  })

  return errors
}