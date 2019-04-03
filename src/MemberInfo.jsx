import React from 'react';
import PropTypes from 'prop-types';

export default function MemberInfo({ member, remove }) {
  return (
    <li key={member.name}>
      {`${member.name}__${member.dept}__${member.gender}`}
      <button
        type="button"
        onClick={() => remove(member)}
      >
          削除
      </button>
    </li>
  );
}

MemberInfo.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string,
    dept: PropTypes.string,
    gender: PropTypes.string,
  }),
  remove: PropTypes.func,
};
MemberInfo.defaultProps = {
  member: { name: 'FOO', dept: 'FOO', gender: 'FOO' },
  remove: () => { 'FOO'; },
};
