import { Field, FieldLabel, Grid, Stack } from "@strapi/design-system";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { debounceTime, Subject } from 'rxjs'
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/mui';
// import { JsonForms } from '@jsonforms/react';
// import { materialRenderers } from '@jsonforms/material-renderers';
// import { createAjv, UISchemaElement, JsonSchema  } from "@jsonforms/core";


const UISCHEMA: UiSchema = {
    'ui:submitButtonOptions': {
        norender: true,
        submitText: 'Submit',
    },
};

const parseValue = (value: string, type: 'RJSFSchema' | 'UiSchema' | 'generic'): RJSFSchema | UiSchema | Record<any, any> => {
    try {
        const object = JSON.parse(value);

        //check from object JsonSchema 
        if (type === 'RJSFSchema') {
            return object as RJSFSchema
        }
        if (type === 'UiSchema') {
            return { ...object, ...UISCHEMA } as UiSchema
        }
        return object
    } catch (error) {
        return {};
    }
};

interface JsonFormProps {
    name: string;
    onChange: (
        {
            target: { name, value, type },
        }: { target: { name: string; value: any; type: string } },
        shouldSetInitialValue?: boolean
    ) => void;
    value: null | string //| Record<string, any>; // JSON OBJECT
    attribute: {
        type: string;
        customFiled: string;
        options?: {
            schema: RJSFSchema | undefined;
            uischema: UiSchema | undefined;
        };
        advanced?: {
            schema: RJSFSchema | undefined;
            uischema: UiSchema | undefined;
        }
    };
    intlLabel: {
        id: string;
        defaultMessage: string;
    };
}

const JsonSchemaForm: React.FC<JsonFormProps> = ({
    name,
    attribute: {
        options,
        type,
        advanced
    },
    value: initialValue,
    onChange,
    ...props
}) => {
    const {
        modifiedData,
        layout: { attributes },
        ...cme
    } = useCMEditViewDataManager();

    const { Schema: schemaStr, Uischema: uischemaStr } = modifiedData?.Data?.Schema ? modifiedData.Data : modifiedData || { Schema: undefined, Uischema: JSON.stringify(UISCHEMA) };

    const schema = parseValue(schemaStr, 'RJSFSchema')
    const uischema = parseValue(uischemaStr, 'UiSchema') || UISCHEMA
    const [subject] = useState(new Subject<string>())

    useEffect(() => {

        console.log(modifiedData.Schema)

    }, [modifiedData])

    useEffect(() => {
        const subscription = subject.pipe(debounceTime(1000)).subscribe(handleValueChange)

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const value = initialValue ? parseValue(initialValue, 'generic') : null


    const handleValueChange = (value: string) => {

        onChange({
            target: {
                name,
                value,
                type,
            },
        });
    };

    const handleChange = (value?: any) => {
        const { formData } = value
        const valueToSet = JSON.stringify(formData)
        subject.next(valueToSet)
    }

    return (
        <Field name={name}>
            <Stack spacing={1}>
                <FieldLabel>{name}</FieldLabel>
                {schema && <Form
                    schema={schema}
                    uiSchema={uischema}
                    validator={validator}
                    formData={value}
                    onChange={(data) => handleChange(data)}
                    onSubmit={(data) => console.log('submitted')}
                    onError={(error) => console.log('errors')}
                />}
            </Stack>
        </Field>
    );

};

export default JsonSchemaForm;
