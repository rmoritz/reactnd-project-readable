import React from 'react';
import * as ReactRedux from 'react-redux';
import { Box, Label, Input, Textarea, Select } from 'rebass';
import { Field, reduxForm } from 'redux-form';
import { LinkButton } from './custom-styled';

const renderTextarea = ({ input }) => (
    <Textarea {...input} />
);

const renderInput = ({ input }) => (
    <Input {...input} />
);

const renderSelect = ({ input, children }) => (
    <Select
      {...input}
      onBlur={(event) => input.onBlur(event.target.value)}
      onChange={(event) => input.onChange(event.target.value)}
      children={children} />
);

class PostEditor extends React.Component {
    render() {
        const { categories, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
              <Box>
                <Label children="Title" />
                <Field name="title"
                       component={renderInput}
                       type="text" />
              </Box>
              <Box>
                <Label children="Author"/>
                <Field name="author"
                       component={renderInput}
                       type="text" />
              </Box>
              <Box>
                <Label children="Category"/>
                <Field name="category"
                       component={renderSelect}>
                  {
                      categories.map(cat => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                      ))
                  }
                </Field>
              </Box>
              <Box>
                <Label children="Body"/>
                <Field name="body"
                       component={renderTextarea}
                       type="text" />
              </Box>
              <Box mt={4}>
                <LinkButton fg='white' bg='black' children="Save" />
              </Box>
            </form>
        );
    }
};

function mapStateToProps({ categories }) {
    return { categories };
}

export default ReactRedux.connect(mapStateToProps)(
    reduxForm({ form: 'post-editor' })(PostEditor)
);
