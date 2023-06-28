const handleSearchByUser = async (userName) => {
  const collectedDataUserFetch = await fetch(
    `https://api.github.com/search/users?q=${userName}+repos:%3E20&per_page=15`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );
  const collectedDataUserJson = await collectedDataUserFetch.json();
  return collectedDataUserJson;
};

const handleSearchByTopic = async (topic) => {
  const collectedDataTopicFetch = await fetch(
    `https://api.github.com/search/repositories?q=${topic}+language:javascript&sort=stars&order=desc&per_page=50`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );
  const collectedDataTopicJson = collectedDataTopicFetch.json();
  return collectedDataTopicJson;
};
const renderUserCard = (user) => {
  const userList = document.querySelector('ul#user-list');
  const userCard = document.createElement('li');
  const userDiv = document.querySelector('div.user-div');
  userCard.className = 'userCard';
  userCard.innerHTML = `<div class='user-div'>
  <img src = "${user.avatar_url}" class="user-photos" alt="${user.login}'s avatar"/>
  <span>Username: ${user.login}</span>
  <a href="${user.html_url}" onclick='window.open'>User's GitHub Profile</a>
  </div>`;
  userList.appendChild(userCard);
};
document.addEventListener('DOMContentLoaded', () => {
  const toggleState = document.querySelector('#toggle-box');
  const inputBox = document.querySelector('input#search');
  const searchForm = document.querySelector('form#github-form');
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('ul#user-list').innerHTML = '';
    const searchByUserObj = await handleSearchByUser(inputBox.value);
    for (const user in searchByUserObj.items) {
      renderUserCard(searchByUserObj.items[user]);
    }
  });
});
