import React from 'react';
import * as ReactRedux from 'react-redux';
import { Relative, Absolute, Row, Column, Box, Label, Input, Textarea, Select } from 'rebass';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
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
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        category: PropTypes.string,
        initialValues: PropTypes.object
    }

    render() {
        const { 
            categories,
            onCancel,
            handleSubmit, 
            pristine, 
            submitting 
        } = this.props;

        return (
            <form>
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
              <Row mt={4}>
                <Column width={1/2}>
                  <LinkButton fg='white' bg='black' children="Save"
                              disabled={pristine || submitting}
                              onClick={handleSubmit} />
                </Column>
                <Column width={1/2}>
                  <Relative>
                    <Absolute right={0}>
                      <LinkButton fg='white' bg='black' children="Cancel"
                                  disabled={submitting} onClick={onCancel} />
                    </Absolute>
                  </Relative>
                </Column>
              </Row>
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
