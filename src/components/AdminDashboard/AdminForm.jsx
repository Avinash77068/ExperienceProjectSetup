/**
 * AdminForm Component - Enterprise Architecture
 * Form component for adding/editing shayri
 * @author Senior Development Team
 * @version 2.0.0
 */

import { ADMIN_STYLES } from './styles'

export default function AdminForm({ 
  formData, 
  errors, 
  isSubmitting, 
  categories, 
  onInputChange, 
  onSubmit, 
  onReset 
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }
  
  return (
    <form onSubmit={handleSubmit} className={ADMIN_STYLES.form}>
      <div className={ADMIN_STYLES.formGroup}>
        <label className={ADMIN_STYLES.label}>
          Shayri Text
        </label>
        <textarea
          value={formData.text}
          onChange={(e) => onInputChange('text', e.target.value)}
          className={ADMIN_STYLES.textarea}
          rows={4}
          placeholder="शायरी यहाँ लिखें..."
          disabled={isSubmitting}
        />
        {errors.text && (
          <div className="text-red-400 text-sm mt-1">{errors.text}</div>
        )}
      </div>
      
      <div className={ADMIN_STYLES.formGroup}>
        <label className={ADMIN_STYLES.label}>
          Author Name
        </label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => onInputChange('author', e.target.value)}
          className={ADMIN_STYLES.input}
          placeholder="अपना नाम लिखें..."
          disabled={isSubmitting}
        />
        {errors.author && (
          <div className="text-red-400 text-sm mt-1">{errors.author}</div>
        )}
      </div>
      
      <div className={ADMIN_STYLES.formGroup}>
        <label className={ADMIN_STYLES.label}>
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => onInputChange('category', e.target.value)}
          className={ADMIN_STYLES.select}
          disabled={isSubmitting}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <div className={ADMIN_STYLES.formGroup}>
        <label className={ADMIN_STYLES.label}>
          Image URL (Optional)
        </label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => onInputChange('imageUrl', e.target.value)}
          className={ADMIN_STYLES.input}
          placeholder="https://example.com/image.jpg"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="flex gap-2">
        <button
          type="submit"
          className={ADMIN_STYLES.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Shayri'}
        </button>
        
        <button
          type="button"
          onClick={onReset}
          className={`${ADMIN_STYLES.button} bg-zinc-700 hover:bg-zinc-600`}
          disabled={isSubmitting}
        >
          Reset
        </button>
      </div>
    </form>
  )
}
