export const contactRequireFields = (values: ContactRequestInput) => {
  const errors: Partial<ContactRequestInput> = {}

  const requiredFields: (keyof ContactRequestInput)[] = ['name', 'email', 'subject', 'message']

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required field'
    }
  })

  return errors
}