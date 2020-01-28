import React from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import {
  Card,
  Headline,
  Field,
  Icon,
  Button,
  Flip,
} from '@baretheme/ui';
import { Markdown } from '@baretheme/gatsby-theme-baretheme';
import { mdiEmailCheckOutline } from '@mdi/js';

const Newsletter = ({
  title,
  description,
  success,
  error,
  emailField,
  result,
  onSubmit,
  onReset,
}) => {
  const {
    handleSubmit,
    register,
    errors,
    formState,
  } = useForm();

  const handleReset = () => {
    onReset();
  };

  return (
    <Flip
      flipped={!!result}
      front={(
        <Card>
          <Card.Body>
            { title && <Headline as="h2" size={1} align="center">{title}</Headline>}
            { description && <Markdown align="center">{description}</Markdown>}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Field
                name="email"
                mt={1}
                label={emailField.label}
                placeholder={emailField.placeholder}
                error={errors.email && errors.email.message}
                loading={formState.isSubmitting}
                ref={register({
                  required: 'Required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: emailField.invalid,
                  },
                })}
                append={(
                  <Field.Button nativeType="submit">
                    <Icon path={mdiEmailCheckOutline} />
                  </Field.Button>
                )}
              />
            </form>
          </Card.Body>
        </Card>
      )}
      back={(
        <Card>
          <Card.Body center>
            { result === 'success' && (
            <div>
              <Headline as="h2" size={1} align="center">{success.title}</Headline>
              <Markdown align="center">{success.message}</Markdown>
            </div>
            )}
            { result === 'error' && (
            <div>
              <Headline as="h2" size={1} align="center">{error.title}</Headline>
              <Markdown align="center">{error.message}</Markdown>
              <Button palett="error" mt={1} ml="auto" mr="auto" onClick={handleReset}>{error.button}</Button>
            </div>
            )}
          </Card.Body>
        </Card>
      )}
    />
  );
};

Newsletter.defaultProps = {
  title: 'Newsletter',
  description: 'Please subscribe to my newsletter.',
  onSubmit: () => {},
  onReset: () => {},
  result: undefined,
  emailField: {
    placeholder: 'john@doe.com',
    invalid: 'Invalid email address',
    label: 'email',
  },
  success: {
    title: 'Success!',
    message: 'Thanks for subscribing!',
  },
  error: {
    title: 'Error!',
    message: 'Something went wrong!',
    button: 'Try again',
  },
};

Newsletter.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  emailField: PropTypes.shape({
    placeholder: PropTypes.string,
    invalid: PropTypes.string,
    label: PropTypes.string,
  }),
  success: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string,
  }),
  error: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string,
    button: PropTypes.string,
  }),
  result: PropTypes.oneOf(['success', 'error']),
};

export default Newsletter;
