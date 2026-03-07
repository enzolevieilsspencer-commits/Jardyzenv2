import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Déclenche une animation CSS (.is-revealed) lorsque l'élément entre dans le viewport.
 * @param {Object} options
 * @param {number} [options.threshold=0.1] - Fraction de l'élément visible avant déclenchement
 * @param {string} [options.rootMargin='0px 0px 50px 0px'] - Marge (bas) pour déclencher un peu avant
 * @returns {{ revealRef: import('vue').Ref<HTMLElement|null> }}
 */
export function useScrollReveal({ threshold = 0.1, rootMargin = '0px 0px 50px 0px' } = {}) {
  const revealRef = ref(null)
  let observer = null

  onMounted(() => {
    if (!revealRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(revealRef.value)
  })

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })

  return { revealRef }
}
