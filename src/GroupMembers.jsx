import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const DelayItem = ({ time, ...props }) => {
  const [showStatus, setShowStatus] = useState('hide');
  useEffect(() => {
    const timer = window.setTimeout(() => { setShowStatus(''); }, time);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <span
      style={{ fontSize: '32px', padding: '10px 30px 0 0' }}
      className={showStatus}
      {...props}
    />
  );
};

const GroupMembers = ({ groupMembers }) => (

  <section>
    <table>
      <tbody>
        {Object.keys(groupMembers).map((val, valIndex, arr) => (
          <tr key={val}>
            <th>{val}</th>
            {groupMembers[val].map((member, memberIndex) => (
              <td key={member.name}>
                <DelayItem time={((valIndex * arr.length) + (memberIndex + 1)) * 500}>
                  {member.name}
                </DelayItem>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
GroupMembers.propTypes = {
  groupMembers: PropTypes.array,
};
DelayItem.propTypes = {
  time: PropTypes.number,
};
GroupMembers.defaultProps = {
  groupMembers: { name: 'FOO', dept: 'FOO', gender: 'FOO' },
};
DelayItem.defaultProps = {
  time: 3,
};


export default GroupMembers;
