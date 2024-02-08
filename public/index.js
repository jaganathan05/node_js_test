
window.addEventListener('DOMContentLoaded', async () => {
    try {

        const createForm = document.getElementById('createForm');
        createForm.addEventListener('submit', async (e) => {
            
            await posttable();
        });

        const response = await axios.get('http://localhost:3000/tables'); 
        const tables = response.data.table; 


        const tableContainer = document.querySelector('.tables'); 

        if (tables && tables.length > 0) {
            tables.forEach(tableName => {
                const tableLink = document.createElement('li');
                tableLink.innerHTML = `<a style="color: white;" href="/table/${tableName}">${tableName}</a>`;
                tableContainer.appendChild(tableLink); 
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
        const form = document.getElementById('createForm');
        form.addEventListener('submit', posttable());

async function posttable() {
    try {
        const tablename = document.getElementById('tablename').value;
        const fields = document.querySelectorAll('.fields .row');
        const fieldNames = Array.from(fields).map(field => field.querySelector('[name="fieldname"]').value);
        const types = Array.from(fields).map(field => field.querySelector('[name="type"]').value);

        const data = {
                tablename,
                fieldname: fieldNames,
                type: types
            };

        console.log(data);
        
            const response = await axios.post('http://localhost:3000/table', data);
            if(response.message){
                window.localStorage.href='/home'
            }
           
        } catch (error) {
            console.error('Error:', error);
        }
    }