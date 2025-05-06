const length: number = 8

export const passwordValidate = (values: { password: string }) => {
    const errors: { password?: string } = {}
  
    if (!values.password) {
      errors.password = 'Required field'
    } else if (values.password.length < length) {
      errors.password = `Password must be at least ${length} characters long`
    }
  
    return errors
}