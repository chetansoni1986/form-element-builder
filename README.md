# Form Element Builder

A simple form element builder library for React and Next.js applications. This library provides an intuitive API for creating form elements with a clean, object-oriented syntax.

## 🚀 Features

- **Declarative API**: Clean, object-oriented syntax for form element creation
- **TypeScript Support**: Full TypeScript support with type definitions
- **React/Next.js Compatible**: Works seamlessly with React and Next.js projects
- **Lightweight**: Zero external dependencies (except React)
- **Flexible**: Support for all HTML form elements and custom attributes
- **Developer Friendly**: Easy to use and integrate

## 📦 Installation

```bash
npm install form-element-builder
```

## 🎯 Quick Start

```typescript
import { Form } from 'form-element-builder';

// Create a text input
const nameInput = Form.input('name', {
  type: 'text',
  class: 'form-control',
  placeholder: 'Enter your name',
  required: true
});

// Create a select dropdown
const countrySelect = Form.select('country', {
  class: 'form-select',
  options: [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' }
  ]
});
```

## 📚 API Reference

### Form.input(name, options)

Creates an input element.

```typescript
Form.input('email', {
  type: 'email',           // Input type (text, email, password, etc.)
  class: 'form-control',   // CSS class name (also accepts 'className')
  placeholder: 'Enter email',
  required: true,
  value: 'default@example.com',
  onChange: handleChange
})
```

**Options:**
- `type`: Input type (default: 'text')
- `class` or `className`: CSS class names
- `id`: Element ID (defaults to field name)
- `placeholder`: Placeholder text
- `value` / `defaultValue`: Input value
- `required`: Make field required
- `disabled`: Disable the field
- `readonly`: Make field read-only
- Plus all standard HTML input attributes

### Form.textarea(name, options)

Creates a textarea element.

```typescript
Form.textarea('message', {
  class: 'form-control',
  rows: 4,
  cols: 50,
  placeholder: 'Enter your message',
  value: 'Default message'
})
```

### Form.select(name, options)

Creates a select dropdown.

```typescript
Form.select('country', {
  class: 'form-select',
  options: [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    'Simple Option',  // Will use same value for both value and label
    42               // Numbers are converted to strings
  ]
})
```

**Options Array Format:**
- Object: `{ value: 'us', label: 'United States', disabled?: boolean }`
- String: Used as both value and label
- Number: Converted to string and used as both value and label

### Form.checkbox(name, options)

Creates a checkbox input.

```typescript
Form.checkbox('newsletter', {
  class: 'form-checkbox',
  value: '1',
  checked: true,
  onChange: handleChange
})
```

### Form.radio(name, options)

Creates a radio button input.

```typescript
Form.radio('gender', {
  value: 'male',
  checked: selectedGender === 'male',
  onChange: handleChange
})
```

### Form.hidden(name, options)

Creates a hidden input field.

```typescript
Form.hidden('csrf_token', {
  value: 'abc123xyz'
})
```

### Form.submit(text, options)

Creates a submit button.

```typescript
Form.submit('Submit Form', {
  class: 'btn btn-primary',
  onClick: handleSubmit
})
```

### Form.button(text, options)

Creates a regular button.

```typescript
Form.button('Click Me', {
  type: 'button',
  class: 'btn btn-secondary',
  onClick: handleClick
})
```

### Form.label(text, forAttribute, options)

Creates a label element.

```typescript
Form.label('Email Address:', 'email', {
  class: 'form-label'
})
```

## 🎨 Complete Example

```typescript
import React, { useState } from 'react';
import { Form } from 'form-element-builder';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
    newsletter: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {Form.label('Name:', 'name')}
        {Form.input('name', {
          type: 'text',
          class: 'form-control',
          value: formData.name,
          onChange: handleChange,
          required: true
        })}
      </div>

      <div>
        {Form.label('Email:', 'email')}
        {Form.input('email', {
          type: 'email',
          class: 'form-control',
          value: formData.email,
          onChange: handleChange,
          required: true
        })}
      </div>

      <div>
        {Form.label('Country:', 'country')}
        {Form.select('country', {
          class: 'form-control',
          value: formData.country,
          onChange: handleChange,
          options: [
            { value: '', label: 'Select a country' },
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' }
          ]
        })}
      </div>

      <div>
        {Form.label('Message:', 'message')}
        {Form.textarea('message', {
          class: 'form-control',
          rows: 4,
          value: formData.message,
          onChange: handleChange
        })}
      </div>

      <div>
        {Form.checkbox('newsletter', {
          checked: formData.newsletter,
          onChange: handleChange
        })}
        {Form.label('Subscribe to newsletter', 'newsletter')}
      </div>

      {Form.submit('Submit', { class: 'btn btn-primary' })}
    </form>
  );
}
```

## 📁 Project Structure

```
form-lib/
├── src/
│   ├── lib/
│   │   ├── Form.tsx        # Main Form class
│   │   └── index.ts        # Library exports
│   └── app/                # Demo application
│       ├── layout.tsx
│       └── page.tsx
├── dist/                   # Built library files (generated)
├── package.json
├── tsconfig.json          # Next.js TypeScript config
├── tsconfig.lib.json      # Library build config
└── README.md
```

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Demo Application
```bash
npm run dev
```

### Build Library
```bash
npm run build:lib
```

### Build Everything
```bash
npm run build
```

### Lint Code
```bash
npm run lint
```

## 📦 Publishing

1. Update version in `package.json`
2. Build the library: `npm run build:lib`
3. Publish to npm: `npm publish`

The library will be built to the `dist/` directory and published as a standalone package.

## 🤝 TypeScript Support

This library is written in TypeScript and provides full type definitions. All form element options are properly typed:

```typescript
import { Form, FormFieldOptions, SelectOption } from 'form-element-builder';

const options: FormFieldOptions = {
  type: 'email',
  class: 'form-control',
  required: true
};

const selectOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' }
];
```

## 🎯 Design Philosophy

This library provides a clean, declarative API for React developers who want:

- **Simplicity**: One-line form element creation with minimal boilerplate
- **Consistency**: Uniform API across all form elements  
- **Flexibility**: Full control over attributes and styling
- **Type Safety**: Complete TypeScript support with comprehensive type definitions

## 📄 License

MIT License - see LICENSE file for details.

## 🐛 Issues & Contributing

Found a bug or want to contribute? Please visit our [GitHub repository](https://github.com/chetansoni1986/form-element-builder).

---

Made with ❤️ for the React community