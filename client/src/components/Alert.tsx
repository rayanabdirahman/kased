import React from 'react';

interface IProps {
  status: string,
  message: any,
  displayWhen: any
}

const Alert: React.FunctionComponent<IProps> = ({ status, message, displayWhen }) => (
  <div className={`alert alert-${status}`} role="alert" style={{display: displayWhen ? 'block': 'none'}}>
    { message }
  </div>
)

export default Alert