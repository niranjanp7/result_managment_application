const deleteStudentRecord = (id) => {
    const deleteRec = () => {
        fetch(`/teacher/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then((data) => {
            const dataTable = document.querySelector("#studentList");
            dataTable.querySelector(`tr#rollNo${id}`).remove();
            document.querySelector("#recordCount").textContent = dataTable.querySelector("tbody").rows.length;
        }).catch((error) => {
            console.error('Error:', error);
        });
    }
    cratePopUp("Delete Record", "Delete Student record with Roll No. : " + id, "Delete", "Cancel", deleteRec);
}
document.querySelectorAll("#deleteRec").forEach((btn) => {
    btn.addEventListener("click", () => {
        deleteStudentRecord(btn.dataset.rollno)
    });
});