import React, {
  useState, useEffect, useReducer, Fragment,
} from 'react';
import AddMember from './AddMember';
import MemberInfo from './MemberInfo';
import Button from './Button';

const initialMember = {
  members: [
    { name: '元紀', dept: '開発', gender: '男性' },
    { name: '安田', dept: '開発', gender: '女性' },
    { name: '裕太', dept: 'マーケ', gender: '男性' },
    { name: '菜々', dept: '開発', gender: '女性' },
    { name: '木内', dept: '営業', gender: '男性' },
  ],
};

const initialPageStatus = '選択中';

const initialGroups = [{ team: 'クジラ' }, { team: 'ライオン' }, { team: 'カメ' }];

const shuffle = array => array.sort(() => Math.random() - 0.5);


const membersReducer = (state, action) => {
  switch (action.type) {
  case 'ADD_MEMBER':
    return { members: [...state.members, action.member] };
  case 'REMOVE_MEMBER':
    return { members: state.members.filter(member => member.name !== action.member.name) };
  case 'SHUFFLE_MEMBER':
    return { members: shuffle(state.members) };
  default:
    throw new Error();
  }
};

const App = () => {
  const [pageStatus, setPageStatus] = useState(initialPageStatus);
  const [memberState, dispatch] = useReducer(membersReducer, initialMember);
  const [groups, setGroups] = useState([]);

  const arrangeGroupMember = () => {
    const newGroups = [...groups];
    const groupsLength = groups.length;
    const membersLength = memberState.members.length;
    for (let i = 0; i < membersLength; i + 1) {
      newGroups[i % groupsLength].member = memberState.members[i].name;
    }
    console.log(groups);
    newGroups[0].member = 'genki';
    setGroups(newGroups);
    console.log(groups);
  };

  useEffect(() => {
    document.title = `現在: ${pageStatus}`;
  });

  return (
    <div>
      <div>
        {`今日の参加者: ${memberState.members.length}人`}
      </div>
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
      <Button onClickFunction={() => { dispatch({ type: 'SHUFFLE_MEMBER' }); setPageStatus('シャッフル中'); }} text="シャッフル" />
      <Button
        onClickFunction={
          () => setGroups(initialGroups.slice(0, Math.ceil(memberState.members.length / 4)))
        }
        text="グループ作成"
      />
      <div>
        {groups.length && (
          <Fragment>
            <ul>
              { groups.map(group => <li key={group.team}>{group.team}</li>) }
            </ul>
            <Button
              onClickFunction={
                () => arrangeGroupMember()
              }
              text="グループ作成"
            />
          </Fragment>
        )
        }
      </div>
    </div>
  );
};

export default App;
