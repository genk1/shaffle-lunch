import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';


export default function MemberInfo({ members, remove }) {
  const DefaultMember = ({ style, ...props }) => (
    <span
      style={{
        display: 'inline-flex',
        marginRight: '.25em',
        borderRadius: '.25em',
        padding: '.15em 1em',
        color: 'blue',
        fontWeight: 'bold',
        ...style,
      }}
      {...props}
    />
  );

  const SalesMember = props => (
    <DefaultMember style={{ color: 'red' }} {...props} />
  );

  const MarketingMember = props => (
    <DefaultMember style={{ color: 'orange' }} {...props} />
  );

  const SysDevMember = props => (
    <DefaultMember style={{ color: 'purple' }} {...props} />
  );

  const DepartmentMember = ({ member, ...props }) => {
    switch (member.dept) {
    case '開発':
      return <SysDevMember {...props} />;
    case '営業':
      return <SalesMember {...props} />;
    case 'マーケ':
      return <MarketingMember {...props} />;
    default:
      return <DefaultMember {...props} />;
    }
  };
  return (
    <Fragment>
      {members.map(member => (
        <li
          key={member.name}
          style={{
            width: '25%',
            display: 'block',
            float: 'left',
          }}
        >
          <DepartmentMember member={member}>{`${member.name}`}</DepartmentMember>
          <Button onClickFunction={() => remove(member)} text="削除" />
        </li>
      ))
      }
    </Fragment>
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
