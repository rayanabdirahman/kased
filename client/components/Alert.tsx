import React from 'react';

type Props = {
  status: string,
  message: any,
  displayWhen: any
}

const Alert: React.FunctionComponent<Props> = ({ status, message, displayWhen }) => (
  <div className={`alert alert-${status}`} role="alert" style={{display: displayWhen ? 'block': 'none'}}>
    { message }
  </div>
)

export default Alert