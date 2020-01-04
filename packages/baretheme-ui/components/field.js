import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import composeRefs from '@seznam/compose-react-refs';
import { Button, Shake } from '@baretheme/ui';
import withSpacing from '../hocs/with-spacing';

const FieldContext = React.createContext(null);

function useFieldContext() {
  const context = React.useContext(FieldContext);
  if (!context) {
    throw new Error(
      'Field compound components cannot be rendered outside the Field component',
    );
  }
  return context;
}
const StyledField = styled.div`
  display: flex;
  align-items: stretch;
  overflow: hidden;
  border: 2px solid transparent;
  transition: border-color 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
  border-radius: ${(props) => props.theme.radius(1)};

  ${(props) => !props.blank && css`
    box-shadow: ${props.theme.shadow(0)};
    background-color: ${props.theme.color.raised};
  `}
`;

const FieldBody = styled.div`
  flex: 1;
  overflow: hidden;
`;

const StyledInputWrapper = styled.div`
  position: relative;
  padding-left: ${(props) => props.theme.spacing(0)};
  padding-right: ${(props) => props.theme.spacing(0)};
  padding-bottom: ${(props) => props.theme.spacing(0)};
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  background-color: transparent;
  color: ${(props) => props.theme.color.foreground};
  line-height: ${(props) => props.theme.lineHeight(0)};
  font-size: ${(props) => props.theme.fontSize(0)};
  text-align: ${(props) => props.align};
  border: none;

  ${(props) => props.blank && css`
    border: none;
  `}
`;

const FieldAddon = styled.div`
  display: flex;
  align-items: stretch;
`;

const FieldHeader = styled.div`
  min-height: 1ch;
  margin-left: ${(props) => props.theme.spacing(0)};
  margin-right: ${(props) => props.theme.spacing(0)};
  margin-top: ${(props) => props.theme.spacing(-2)};
  font-size: ${(props) => props.theme.fontSize(-2)};
  transform-origin: top left;
  transition: transform ease-in-out 0.5s;

  ${(props) => !props.compact && css`
    transform: scale(1.5) translateY(0.6rem);
  `}
`;

const FieldError = styled.div`
  color: ${(props) => props.theme.color.error};
`;

const FieldLabel = styled.label``;

const FieldPlaceholder = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: ${(props) => props.theme.spacing(0)};
  margin-right: ${(props) => props.theme.spacing(0)};
  pointer-events: none;
  transition: opacity 0.5s ease-in-out;
  color: ${(props) => props.theme.color.dimmed};
  text-align: ${(props) => props.align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${(props) => !props.visible && css`
    opacity: 0;
  `}
`;

const Field = React.forwardRef(
  ({
    name,
    label,
    loading,
    placeholder,
    error,
    valid,
    focus,
    append,
    prepend,
    align,
    onChange,
    onBlur,
    onFocus,
    value,
    defaultValue,
    blank,
    ...props
  }, ref) => {
    const innerRef = React.useRef(null);
    const [focused, setFocused] = React.useState();
    const [innerValue, setInnerValue] = React.useState();

    useEffect(() => {
      const el = innerRef.current;

      if (el) {
        if (focus) {
          el.focus();
        } else {
          el.blur();
        }
      }
    }, [focus]);

    const handleFocus = (e) => {
      setFocused(true);
      onFocus(e);
    };

    const handleBlur = (e) => {
      setFocused(false);
      onBlur(e);
    };

    const handleChange = (e) => {
      const el = innerRef.current;
      setInnerValue(el.value);
      onChange(e);
    };

    const handleBodyClick = () => {
      const el = innerRef.current;
      el.focus();
    };

    return (
      <FieldContext.Provider value={{ loading, error, valid }}>
        <Shake animate={!!error}>
          <StyledField
            {...props}
            blank={blank}
            error={error && innerValue}
            valid={valid}
          >
            { prepend && <FieldAddon position="left">{prepend}</FieldAddon>}
            <FieldBody onClick={handleBodyClick}>
              <FieldHeader compact={innerValue || focused}>
                { label && !(error && innerValue) && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
                { error && innerValue && <FieldError>{error}</FieldError>}
              </FieldHeader>
              <StyledInputWrapper>
                { placeholder && (
                  <FieldPlaceholder visible={!innerValue && focused} align={align}>
                    { placeholder }
                  </FieldPlaceholder>
                )}
                <StyledInput
                  name={name}
                  defaultValue={defaultValue || value}
                  ref={composeRefs(innerRef, ref)}
                  align={align}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                />
              </StyledInputWrapper>
            </FieldBody>
            { append && <FieldAddon position="right">{append}</FieldAddon>}
          </StyledField>
        </Shake>
      </FieldContext.Provider>
    );
  },
);

Field.defaultProps = {
  blank: false,
  focus: false,
  valid: true,
  append: '',
  prepend: '',
  align: 'left',
  label: undefined,
  value: undefined,
  defaultValue: undefined,
  placeholder: undefined,
  error: undefined,
  loading: false,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
};

Field.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  valid: PropTypes.bool,
  blank: PropTypes.bool,
  focus: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  append: PropTypes.node,
  prepend: PropTypes.node,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

const FieldWithSpacing = withSpacing(Field);

const StyledButton = styled(Button)`
  border-radius: 0;

  ${(props) => props.icon && css`
    margin-top: -2px;
    line-height: 0;
  `}
`;

const FieldButton = React.forwardRef(({ children, ...props }, ref) => {
  const { loading } = useFieldContext();
  return (
    <StyledButton ref={ref} loading={loading} {...props}>
      {children}
    </StyledButton>
  );
});

FieldButton.propTypes = {
  children: PropTypes.node.isRequired,
};

FieldButton.displayName = 'Field.Button';
FieldWithSpacing.Button = FieldButton;

export default FieldWithSpacing;
