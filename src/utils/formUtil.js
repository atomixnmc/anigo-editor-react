import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as lodash from 'lodash';
import JsonSchemaForm from 'react-jsonschema-form';

export function renderInput(field) {
  return (  // Define stateless component to render input and errors
  <div>
    {field.label &&
      <span className="form-label">{field.label}</span>
    }
    <input {...field.input} className={field.className || 'form-control'} type={field.type} placeholder={field.placeholder} style={field.style}/>
    {field.meta.touched &&
      field.meta.error &&
      <span className="text-danger error">{field.meta.error}</span>
      }
  </div>
);
}

export function renderTextArea(field) {
  return (  // Define stateless component to render input and errors
    <div>
      <textarea type="text" className="form-control" {...field.input} type={field.type} defaultValue={field.input.value}/>
      {field.meta.touched &&
        field.meta.error &&
        <span className="text-danger error">{field.meta.error}</span>
        }
    </div>
);
}

export function renderSelect(field) {
  // console.log(field);
  // field.transformOption = field.transformOption || {};
  if (!field.transformOption.toTitle) {
    field.transformOption.toTitle = (val) => val ? val.title : '';
  }
  if (!field.transformOption.toId) {
    field.transformOption.toId = (val) => val ? val.id : '';
  }
  if (!field.transformOption.toValue) {
    field.transformOption.toValue = (val) => val ? val.value : '';
  }
  if (!field.transformOption.toKey) {
    field.transformOption.toKey = (val) => val ? val.key || val.id : '';
  }
  if (!field.transformOption.toLabel) {
    field.transformOption.toLabel = (val) => val ? val.label || val.value : JSON.stringify(val);
  }
  return (  // Define stateless component to render input and errors
    <div>
      <select className="form-control" {...field.input} disabled={field.disabled} onChange={field.onValueChange} defaultValue={field.defaultValue} value={field.input.value} >
        {field.listValues.map(val =>
          field.transformOption ?
          <option
            title={field.transformOption.toTitle(val)}
            value={field.transformOption.toValue(val)}
            key={field.transformOption.toKey(val)}>{field.transformOption.toLabel(val)}</option>
          :
          <option value={val}></option>)}
      </select>
      {field.meta.error &&
        field.meta.touched &&
        <span className="text-danger error">{field.meta.error}</span>}
    </div>
  );
}

export function filteredArray(arr, key, value) {
  for (let item = 0; item < arr.length; item++) {
    if (arr[item][key] === value) {
      return arr[item];
    }
  }
  return null;
}
export const toIdsTxt = (val) =>{
  const ids = [];
  val.map(item => {
    ids.push(item.value);
  });
  return JSON.stringify(ids);
};

export function optionsTransform(list, values, fieldKey, fieldValue, defaultValues, eachFunc, sort, idName = 'id') {
  let options = [];
  if (!list) {
    return options;
  }
  if (defaultValues) {
    if (lodash.isArray(defaultValues)) {
      options = lodash.clone(defaultValues);
    } else {
      options.push(defaultValues);
    }
  }
  if (fieldKey && fieldValue) {
    list.map(row => {
      options.push({value: row[fieldKey], label: row[fieldValue]});
    });
  } else {
    options = list;
  }
  if (sort) {
    options = lodash.sortBy(options, sort);
  }
  if (values === undefined || values === null) {
    // console.log('values is empty'); // NOTE: New form
    return options;
  } else {
    if (lodash.isString(values) || lodash.isNumber(values)) {
      return lodash.find(options, op=> op.value == values);
    } else if (lodash.isArray(values)) {
      const data = lodash.map(values, (entry) => {
        if (entry) {
          return lodash.find(options, (op)=>(entry[idName] == op.value));
        } else {
          return null;
        }
      });
      return data;
    } else if (lodash.isObject(values)) {
      return lodash.find(options, op=> op.value == values[idName]);
    } else {
      return lodash.find(options, op=> op.value == values);
    }
  }
  return options;
}

export function optionsChange(list, selectedOptions, change, fieldName, idName = 'id', isToValue = false) {
  let data = [];
  if (selectedOptions) {
    if (lodash.isString(selectedOptions) || lodash.isNumber(selectedOptions)) {
      data = lodash.find(list, (entry)=>(entry[idName] == selectedOptions));
    } else if (lodash.isArray(selectedOptions)) {
      data = lodash.map(selectedOptions, (op) => {
        return lodash.find(list, (entry)=>(entry[idName] == op.value));
      });
    } else if (lodash.isObject(selectedOptions)) {
      data = lodash.find(list, (entry)=>(entry[idName] == selectedOptions.value));
    } else {
      data = [];
    }
    if (isToValue) {
      data = data.value;
    }
    if (change) {
      if (fieldName) {
        change(fieldName, data);
      } else {
        change(data);
      }
    }
  }
}

export function renderErrorListTemplate(componentProps) {
  const errors = componentProps.errors;
  return (
    <div>
      {errors.map((error, index) => {
        return (
          <li key={index}>
            {error.stack}
          </li>
        );
      })}
    </div>
  );
}
function renderCustomFieldTemplate(componentProps) {
  const {id, classNames, label, help, required, description, errors, children} = componentProps;
  return (
    <div className={classNames}>
      <label htmlFor={id}>{label}{required ? '*' : null}</label>
      {/* {description} */}
      {children}
      {errors.map(error => <div style={{color: 'red'}}><h5>{error}</h5></div>)}
    </div>
  );
}


export const renderJsonSchemaForm = (schema, uiSchema, rawContent, bindForm, submitForm, initialValues) => {
  return (
    <JsonSchemaForm
    schema={schema}
    uiSchema = {uiSchema}
    formData={rawContent}
    ref={bindForm}
    // errors = {this.state.formErrors}
    // onError={this.onFormError}
    liveValidate={true}
    showErrorList={true}
    ErrorList={({errors})=>{
      return (
        <div>
          {errors.map((error, i) => {
            return (
              <li key={i}>
                {error.stack}
              </li>
            );
          })}
        </div>
      );
    }}
    ObjectFieldTemplate={({title, description, properties})=>{
      return (
        <div>
          {/* {title} */}
          {/* {description} */}
          {properties.map(element => <div key={'field_' + element.name} className="property-wrapper">{element.content}</div>)}
        </div>
      );
    }}
    FieldTemplate={({id, classNames, label, help, required, description, errors, children})=>
      <div className={classNames}>
        <label htmlFor={id}>{label}{required ? '*' : null}</label>
        {/* {description} */}
        {children}
        {errors}
      </div>}
    onSubmit={submitForm}/>
  );
};

export const flattenNestedObject = (values) => {
  const nestedArray = lodash.map(lodash.values(values), (aProp)=>lodash.values(aProp));
  console.log(nestedArray);
  return lodash.flatten(nestedArray);
};
