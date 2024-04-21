// user search endpoint  > search github for user matches
// display the information of the user to the page
//             *username 
//             *avatar
//             *link to their profile

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form')
    form.addEventListener('submit', e => {
        e.preventDefault()

        let searchUser = document.getElementById('search').value 
        console.log(searchUser)
        handleSearch(searchUser)

        function handleSearch() {
            const searchURL = "https://api.github.com/search/users?q="
         
             fetch( searchURL + searchUser, {
                method: "GET",
                header:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify()

             })
             .then(response => response.json())
             .then(data => {
                console.log(data)
                document.getElementById('user-list').innerText = ''
                document.getElementById('repos-list').innerText = ''


                data.items.forEach(user => {
                    let userList = document.createElement('li')
                    userList.innerHTML =`
                <div class = 'content'>
                    <h3> User : ${user.login}</h3>
                    <p> URL : ${user.html_url}</p>
                    <button class= 'repo-button'> Repo </button>
                    <p>URL: <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
                    <img src=${user.avatar_url} />
                </div>
                    `
                document.getElementById('user-list').appendChild(userList)

                const repoButton = document.querySelector('.repo-button')

                repoButton.addEventListener('click', () => {
                    fetch(user.repos_url, {
                        method: "GET",
                        header:{
                            'Content-Type': 'application/json',
                            'Accept': 'application/vnd.github.v3+json'
                        },
                        body: JSON.stringify()
                    })
                    .then(response => response.json())
                    .then(data => {

                    data.forEach(repo => {

                        let repoList = document.createElement('li')
                        repoList.innerHTML = `
                        <h4>${repo.name}</h4>
                        <p> ${repo.html_url} </p>
                        `
                    document.getElementById('repos-list').appendChild(repoList)
                        })

                    })
                } )
                

                })

             })
         } 
        
    })


})


