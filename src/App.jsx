/* eslint-disable no-underscore-dangle */
import React, {
  useState, useEffect, useReducer,
} from 'react';
import AddMember from './AddMember';
import MemberInfo from './MemberInfo';
import Button from './Button';

const initialMember = {
  members: [
    { name: '元紀', dept: '開発', gender: '男性' },
    { name: '三浦', dept: '開発', gender: '男性' },
    { name: '石橋', dept: '開発', gender: '男性' },
    { name: '安田', dept: '開発', gender: '女性' },
    { name: '裕太', dept: 'マーケ', gender: '男性' },
    { name: '皆川', dept: 'マーケ', gender: '男性' },
    { name: '比嘉', dept: 'マーケ', gender: '男性' },
    { name: '菜々', dept: '開発', gender: '女性' },
    { name: '木内', dept: '営業', gender: '男性' },
    { name: '中山', dept: '営業', gender: '男性' },
    { name: '田中', dept: '営業', gender: '男性' },
    { name: 'みさの', dept: '営業', gender: '女性' },
    { name: '舘田', dept: '営業', gender: '女性' },
    { name: '古川', dept: '人事', gender: '男性' },
    { name: '板屋', dept: '経理', gender: '男性' },
    { name: '松尾', dept: '総務', gender: '女性' },
    { name: '小暮', dept: '社長', gender: '男性' },
  ],
};

const ASCII_OF_A = 65;
const MAX_NUMBER_OF_MEMBER = 4;

const shuffle = array => array.sort(() => Math.random() - 0.5);

const convertAsciiToChar = ascii => String.fromCharCode(ascii);

const membersReducer = (state, action) => {
  switch (action.type) {
  case 'ADD_MEMBER':
    return { members: [...state.members, action.member] };
  case 'REMOVE_MEMBER':
    return { members: state.members.filter(member => member.name !== action.member.name) };
  default:
    throw new Error();
  }
};

const App = () => {
  const [memberState, dispatch] = useReducer(membersReducer, initialMember);
  const [groupMembers, setGroupMembers] = useState([]);

  const arrangeGroupMember = () => {
    const _numberOfGroups = Math.ceil(memberState.members.length / MAX_NUMBER_OF_MEMBER);
    const _members = JSON.parse(JSON.stringify(memberState));

    for (let i = 0; i < 10; i += 1) { shuffle(_members.members); }

    const _groupMembers = _members.members.reduce((acc, obj, index) => {
      const key = convertAsciiToChar((index % _numberOfGroups) + ASCII_OF_A);
      if (!acc[key]) { acc[key] = []; }
      acc[key] = [...acc[key], obj];
      return acc;
    }, []);

    setGroupMembers(_groupMembers);
  };

  useEffect(() => {
    document.title = `参加人数: ${memberState.members.length}人`;
  });

  return (
    <section>
      <ul>
        {memberState.members.map(member => (
          <MemberInfo
            key={member.name}
            member={member}
            remove={removeMemberInfo => dispatch({ type: 'REMOVE_MEMBER', member: removeMemberInfo })}
          />
        ))}
      </ul>
      <AddMember add={addMemberInfo => dispatch({ type: 'ADD_MEMBER', member: addMemberInfo })} />

      <div>
        <Button
          onClickFunction={
            () => arrangeGroupMember()
          }
          text="グループ作成"
        />
      </div>
      {groupMembers && (
        <section>
          <table>
            <tbody>
              {Object.keys(groupMembers).map(val => (
                <tr key={val}>
                  <th>{val}</th>
                  {groupMembers[val].map(member => <td key={member.name}>{member.name}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </section>
  );
};

export default App;
