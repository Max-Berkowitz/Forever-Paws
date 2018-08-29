import React from 'react';

export default ({ myPets, deletePet }) => (
  <div className="container">
    <div className="row">
      <div className="col-sm-12 my-4">
        <h2 className="mb-3">Pet List</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Breed</th>
              <th scope="col">ID</th>
            </tr>
          </thead>
          <tbody>
            {/* {myPets.map(({ name, breed, id }) => ( */}
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Retriever</td>
              <td>23892</td>
              <button onClick={() => deletePet(id)} />
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
