import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default function AddMember({ add }) {
  const [name, setName] = useState('');
  const [dept, setDept] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const checkValues = () => {
    if (name.length > 0 && dept.length > 0 && gender.length > 0) {
      add({ name, dept, gender });
      setName('');
      setDept('');
      setGender('');
      setErrorMessage('');
      return true;
    }
    setErrorMessage('内容に不備があります');
  };

  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="名前"
        type="text"
        name="name"
        required
      />
      <select
        value={dept}
        onChange={e => setDept(e.target.value)}
        name="dept"
        required
      >
        <option>部署</option>
        <option value="開発">開発</option>
        <option value="マーケ">マーケ</option>
        <option value="営業">営業</option>
      </select>
      <span>性別</span>
      <label htmlFor="male">
        <input
          type="radio"
          name="gender"
          value="男性"
          id="male"
          checked={gender === '男性'}
          onChange={e => setGender(e.target.value)}
        />
          男性
      </label>
      <label htmlFor="female">
        <input
          type="radio"
          name="gender"
          value="女性"
          id="female"
          checked={gender === '女性'}
          onChange={e => setGender(e.target.value)}
        />
          女性
      </label>
      <Button
        onClickFunction={() => checkValues()}
        text="登録"
      />
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
}

AddMember.propTypes = {
  add: PropTypes.func,
};
AddMember.defaultProps = {
  add: () => { 'FOO'; },
};
