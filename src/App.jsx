/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useReducer } from 'react';
import AddMember from './AddMember';
import MemberInfo from './MemberInfo';
import GroupMembers from './GroupMembers';
import Button from './Button';
import membersJson from './members.json';

const initialMember = {
  members: membersJson,
};

const ASCII_OF_A = 65;

const shuffle = array => array.sort(() => Math.random() - 0.5);

const convertAsciiToChar = ascii => String.fromCharCode(ascii);

const membersReducer = (state, action) => {
  switch (action.type) {
  case 'ADD_MEMBER':
    return { members: [...state.members, action.member] };
  case 'REMOVE_MEMBER':
    return {
      members: state.members.filter(
        member => member.name !== action.member.name,
      ),
    };
  default:
    throw new Error();
  }
};

const App = () => {
  const [memberState, dispatch] = useReducer(membersReducer, initialMember);
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    document.title = `参加人数: ${memberState.members.length}人`;
  });

  const arrangeGroupMember = () => {
    setGroupMembers([]);
    const _maxNumber = Number(document.getElementById('max-number').value);
    const _numberOfGroups = Math.ceil(memberState.members.length / _maxNumber);
    const _members = JSON.parse(JSON.stringify(memberState));

    for (let i = 0; i < 10; i += 1) {
      shuffle(_members.members);
    }

    const _groupMembers = _members.members.reduce((acc, obj, index) => {
      const key = convertAsciiToChar((index % _numberOfGroups) + ASCII_OF_A);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key] = [...acc[key], obj];
      return acc;
    }, []);

    setGroupMembers(_groupMembers);
  };

  return (
    <section style={{ maxWidth: '880px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>
        ⚛️🍣🙈🍔シャッフルランチ第１回目🍔🙈🍣⚛️
      </h1>
      <div>
        <h3>参加者一覧</h3>
        <MemberInfo
          members={memberState.members}
          remove={removeMemberInfo => dispatch({ type: 'REMOVE_MEMBER', member: removeMemberInfo })
          }
        />
      </div>
      <hr />
      <div>
        <h3>追加</h3>
        <AddMember
          add={addMemberInfo => dispatch({ type: 'ADD_MEMBER', member: addMemberInfo })
          }
        />
      </div>
      <hr />
      <div>
        <h3>グループ作成</h3>
        <input
          type="number"
          name="max-number"
          id="max-number"
          defaultValue="4"
          min="1"
          step="1"
          placeholder="最大人数"
        />
        <Button
          onClickFunction={() => arrangeGroupMember()}
          text="グループ作成"
        />
      </div>
      {groupMembers && <GroupMembers groupMembers={groupMembers} />}
    </section>
  );
};

export default App;
