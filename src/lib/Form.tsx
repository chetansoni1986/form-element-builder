import React from 'react';

export interface FormFieldOptions {
  type?: string;
  class?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  accept?: string;
  multiple?: boolean;
  size?: number;
  rows?: number;
  cols?: number;
  wrap?: 'hard' | 'soft';
  autocomplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  [key: string]: any;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface FormSelectOptions extends Omit<FormFieldOptions, 'type'> {
  options?: Array<string | number | SelectOption>;
}

export class Form {
  /**
   * Create an input field
   * @param name Field name
   * @param options Field options including type, class, etc.
   */
  static input(name: string, options: FormFieldOptions = {}): JSX.Element {
    const {
      type = 'text',
      class: cssClass,
      className,
      id = name,
      ...rest
    } = options;

    const finalClassName = cssClass || className;

    return React.createElement('input', {
      key: name,
      name,
      id,
      type,
      className: finalClassName,
      ...rest
    });
  }

  /**
   * Create a textarea field
   * @param name Field name
   * @param options Field options including class, rows, cols, etc.
   */
  static textarea(name: string, options: FormFieldOptions = {}): JSX.Element {
    const {
      class: cssClass,
      className,
      id = name,
      rows = 4,
      cols = 50,
      ...rest
    } = options;

    const finalClassName = cssClass || className;

    return React.createElement('textarea', {
      key: name,
      name,
      id,
      rows,
      cols,
      className: finalClassName,
      ...rest
    });
  }

  /**
   * Create a select dropdown field
   * @param name Field name
   * @param options Field options including options array, class, etc.
   */
  static select(name: string, options: FormSelectOptions = {}): JSX.Element {
    const {
      class: cssClass,
      className,
      id = name,
      options: selectOptions = [],
      ...rest
    } = options;

    const finalClassName = cssClass || className;

    // Process options
    let processedOptions: SelectOption[] = [];
    
    if (selectOptions.length > 0) {
      processedOptions = selectOptions.map(item => {
        if (typeof item === 'object' && item !== null && 'value' in item) {
          return item as SelectOption;
        }
        return { value: item, label: String(item) };
      });
    }

    const optionElements = processedOptions.map((option, index) =>
      React.createElement('option', {
        key: `${name}_option_${index}`,
        value: option.value,
        disabled: option.disabled
      }, option.label)
    );

    return React.createElement('select', {
      key: name,
      name,
      id,
      className: finalClassName,
      ...rest
    }, ...optionElements);
  }

  /**
   * Create a checkbox field
   * @param name Field name
   * @param options Field options including class, value, etc.
   */
  static checkbox(name: string, options: FormFieldOptions = {}): JSX.Element {
    const {
      class: cssClass,
      className,
      id = name,
      value = '1',
      ...rest
    } = options;

    const finalClassName = cssClass || className;

    return React.createElement('input', {
      key: name,
      name,
      id,
      type: 'checkbox',
      value,
      className: finalClassName,
      ...rest
    });
  }

  /**
   * Create a radio button field
   * @param name Field name
   * @param options Field options including class, value, etc.
   */
  static radio(name: string, options: FormFieldOptions = {}): JSX.Element {
    const {
      class: cssClass,
      className,
      id = `${name}_${options.value || 'radio'}`,
      ...rest
    } = options;

    const finalClassName = cssClass || className;

    return React.createElement('input', {
      key: id,
      name,
      id,
      type: 'radio',
      className: finalClassName,
      ...rest
    });
  }

  /**
   * Create a hidden field
   * @param name Field name
   * @param options Field options including value
   */
  static hidden(name: string, options: FormFieldOptions = {}): JSX.Element {
    const {
      id = name,
      ...rest
    } = options;

    return React.createElement('input', {
      key: name,
      name,
      id,
      type: 'hidden',
      ...rest
    });
  }

  /**
   * Create a submit button
   * @param text Button text
   * @param options Button options including class
   */
  static submit(text: string = 'Submit', options: FormFieldOptions = {}): JSX.Element {
    const {
      class: cssClass,
      className,
      id = 'submit_btn',
      ...rest
    } = options;

    const finalClassName = cssClass || className;

    return React.createElement('input', {
      key: 'submit_btn',
      id,
      type: 'submit',
      value: text,
      className: finalClassName,
      ...rest
    });
  }

  /**
   * Create a button
   * @param text Button text
   * @param options Button options including class, type, etc.
   */
  static button(text: string, options: FormFieldOptions = {}): JSX.Element {
    const {
      class: cssClass,
      className,
      id = 'form_button',
      type = 'button',
      ...rest
    } = options;

    const finalClassName = cssClass || className;

    return React.createElement('button', {
      key: id,
      id,
      type,
      className: finalClassName,
      ...rest
    }, text);
  }

  /**
   * Create a label element
   * @param text Label text
   * @param forAttribute The 'for' attribute value
   * @param options Label options including class
   */
  static label(text: string, forAttribute?: string, options: FormFieldOptions = {}): JSX.Element {
    const {
      class: cssClass,
      className,
      id = 'form_label',
      ...rest
    } = options;

    const finalClassName = cssClass || className;

    return React.createElement('label', {
      key: id,
      id,
      htmlFor: forAttribute,
      className: finalClassName,
      ...rest
    }, text);
  }
}