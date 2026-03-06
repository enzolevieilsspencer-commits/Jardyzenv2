import { ref, reactive, computed } from 'vue'

/**
 * Gère l'état complet du formulaire de contact avec validation réactive.
 * @returns {{ form, errors, isValid, status, validateField, submitForm }}
 */
export function useContactForm() {
  const form = reactive({
    nom: '',
    email: '',
    telephone: '',
    type_projet: '',
    message: ''
  })

  const errors = reactive({
    nom: '',
    email: '',
    type_projet: '',
    message: ''
  })

  const status = ref('idle')

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validateField = (field) => {
    switch (field) {
      case 'nom':
        errors.nom = form.nom.trim().length < 2
          ? 'Le nom doit contenir au moins 2 caractères.'
          : ''
        break
      case 'email':
        errors.email = !isEmailValid(form.email)
          ? 'Veuillez saisir une adresse email valide.'
          : ''
        break
      case 'type_projet':
        errors.type_projet = !form.type_projet
          ? 'Veuillez sélectionner un type de projet.'
          : ''
        break
      case 'message':
        errors.message = form.message.trim().length < 10
          ? 'Le message doit contenir au moins 10 caractères.'
          : ''
        break
    }
  }

  const validateAll = () => {
    validateField('nom')
    validateField('email')
    validateField('type_projet')
    validateField('message')
    return !Object.values(errors).some(Boolean)
  }

  const isValid = computed(() =>
    form.nom.trim().length >= 2 &&
    isEmailValid(form.email) &&
    form.type_projet !== '' &&
    form.message.trim().length >= 10
  )

  const resetForm = () => {
    Object.keys(form).forEach((key) => { form[key] = '' })
  }

  const submitForm = async () => {
    if (!validateAll()) return

    status.value = 'loading'

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erreur serveur')
      }

      status.value = 'success'
      resetForm()
    } catch {
      status.value = 'error'
    }
  }

  return { form, errors, isValid, status, validateField, submitForm }
}
