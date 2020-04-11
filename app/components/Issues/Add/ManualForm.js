import React from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';
import { issueDataDictionary } from 'containers/Issues/constants';

import { HorizontalWrapper, InputFormWrapper } from './styledComponents';

// eslint-disable-next-line arrow-body-style
const ManualForm = ({ data, handleInputChange }) => {
  // eslint-disable-next-line no-param-reassign
  const { repo, body, language, value, name } = data;
  return (
    <InputFormWrapper>
      <MainTextInput
        error={!!name.error}
        helperText={name.error}
        label={issueDataDictionary.name}
        onChange={e =>
          handleInputChange({
            field: 'name',
            form: 'data',
            value: e.target.value,
          })
        }
        value={name.value}
      />
      <MainTextInput
        error={!!body.error}
        helperText={body.error}
        label={issueDataDictionary.body}
        onChange={e =>
          handleInputChange({
            field: 'body',
            form: 'data',
            value: e.target.value,
          })
        }
        value={body.value}
      />
      <MainTextInput
        error={!!language.error}
        helperText={language.error}
        label={issueDataDictionary.language}
        onChange={e =>
          handleInputChange({
            field: 'language',
            form: 'data',
            value: e.target.value,
          })
        }
        value={language.value}
      />
      <HorizontalWrapper>
        <MainTextInput
          error={!!repo.error}
          helperText={repo.error}
          label={issueDataDictionary.repo}
          onChange={e =>
            handleInputChange({
              field: 'repo',
              form: 'data',
              value: e.target.value,
            })
          }
          value={repo.value}
        />
        <MainTextInput
          error={!!value.error}
          helperText={value.error}
          label={issueDataDictionary.value}
          onChange={e =>
            handleInputChange({
              field: 'value',
              form: 'data',
              value: e.target.value,
            })
          }
          value={value.value}
        />
      </HorizontalWrapper>
    </InputFormWrapper>
  );
};

ManualForm.propTypes = {
  data: T.object.isRequired,
  handleInputChange: T.func.isRequired,
};

export default ManualForm;