import { Field, FieldLabel, Grid, Stack } from "@strapi/design-system";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import React, { useMemo } from "react";
import { JsonSchema, UISchemaElement } from "@jsonforms/core";
import { JsonForms } from "@jsonforms/react";
import { materialCells, materialRenderers } from "@jsonforms/material-renderers";

interface JsonFormProps {
    name: string;
    onChange: (
        {
            target: { name, value, type },
        }: { target: { name: string; value: any; type: string } },
        shouldSetInitialValue?: boolean
    ) => void;
    value: null | Record<string, any>; // JSON OBJECT
    attribute: {
        type: string;
        customFiled: string;
        options: {
            name: string | null;
            schema: JsonSchema | undefined;
            uischema: UISchemaElement | undefined;
            data: Record<string, any> | null;
        };
    };
    intlLabel: {
        id: string;
        defaultMessage: string;
    };
}

const renderers = [
    ...materialRenderers,
];

const JsonSchemaForm: React.FC<JsonFormProps> = ({
    name,
    attribute: {
        options: { schema = undefined, uischema = undefined },
        type,
    },
    value: initialValue,
    onChange,
    ...props
}) => {
    const {
        layout: { attributes },
        ...cme
    } = useCMEditViewDataManager();

    const value = useMemo(
        () => (initialValue && initialValue) ?? [],
        [initialValue]
    );
    const handleValueChange = (value: unknown) => {
        // const newValue = [...value.splice(0, args.depth), args.value];
 
        onChange({
            target: {
                name,
                value: value, //JSON.stringify(newValue),
                type: type,
            },
        });
    };

    // --------------------------
    // TODO: add model vliadation
    /* --------------------------
    const validTarget = {
      type: "relation",
      relation: "oneToMany",
      target: "api::tag.tag",
      targetModel: "api::tag.tag",
      relationType: "oneToMany",
    };
    */

    return (
        <Field name={name}>
            <Stack spacing={1}>
                <FieldLabel>{name}</FieldLabel>
                <JsonForms
                    schema={schema}
                    uischema={uischema}
                    data={value}
                    renderers={renderers}
                      cells={materialCells}
                    onChange={({ errors, data }) => handleValueChange(data)}
                />
            </Stack>
        </Field>
    );

};

export default JsonSchemaForm;
