import React, { useState, useCallback } from 'react';
import Table from '../components/Table';
import Button from '../components/Button'; // Import Button for modal actions
import Modal from '../components/Modal'; // Import Modal for editing and confirmation
import Input from '../components/Input'; // Import Input for modal form fields
import Select from '../components/Select'; // Import Select for modal form fields
import { User } from '../types';

const MOCK_USERS: User[] = [
  { id: 1, name: 'Alice Smith', email: 'alice.smith@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Bob Johnson', email: 'bob.j@example.com', role: 'Editor', status: 'inactive' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Viewer', status: 'active' },
  { id: 4, name: 'Diana Prince', email: 'diana.p@example.com', role: 'Admin', status: 'active' },
  { id: 5, name: 'Eve Adams', email: 'eve.a@example.com', role: 'Editor', status: 'inactive' },
  { id: 6, name: 'Frank White', email: 'frank.w@example.com', role: 'Viewer', status: 'active' },
  { id: 7, name: 'Grace Taylor', email: 'grace.t@example.com', role: 'Admin', status: 'active' },
  { id: 8, name: 'Henry King', email: 'henry.k@example.com', role: 'Viewer', status: 'inactive' },
  { id: 9, name: 'Ivy Green', email: 'ivy.g@example.com', role: 'Editor', status: 'active' },
  { id: 10, name: 'Jack Black', email: 'jack.b@example.com', role: 'Admin', status: 'active' },
  { id: 11, name: 'Karen Stone', email: 'karen.s@example.com', role: 'Viewer', status: 'inactive' },
  { id: 12, name: 'Liam Hall', email: 'liam.h@example.com', role: 'Editor', status: 'active' },
];

const TablesTestPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'active' as 'active' | 'inactive',
  });

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const openDeleteConfirmation = useCallback((user: User) => {
    setUserToDelete(user);
    setIsDeleteConfirmationModalOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (userToDelete) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
      setIsDeleteConfirmationModalOpen(false);
      setUserToDelete(null);
    }
  }, [userToDelete]);

  const cancelDelete = useCallback(() => {
    setIsDeleteConfirmationModalOpen(false);
    setUserToDelete(null);
  }, []);

  const handleEditUser = useCallback((user: User) => {
    setEditingUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsEditModalOpen(true);
  }, []);

  const handleEditFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSaveEdit = useCallback(() => {
    if (editingUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? { ...user, ...editFormData, id: user.id } : user
        )
      );
      setIsEditModalOpen(false);
      setEditingUser(null);
    }
  }, [editingUser, editFormData]);

  const userColumns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (user: User) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {user.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (user: User) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => handleEditUser(user)}
            className="text-blue-600 hover:text-blue-900 text-sm" 
            data-testid={`edit-btn-${user.id}`}
            aria-label={`Edit user ${user.name}`}
          >
            Edit
          </button>
          <button 
            onClick={() => openDeleteConfirmation(user)} // Use the new function here
            className="text-red-600 hover:text-red-900 text-sm" 
            data-testid={`delete-btn-${user.id}`}
            aria-label={`Delete user ${user.name}`}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const roleOptions = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Editor', label: 'Editor' },
    { value: 'Viewer', label: 'Viewer' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Table Testing Playground</h2>
      <p className="mb-8 text-gray-600">
        This section showcases a data table with features like sorting, pagination, and custom rendering.
        Test interaction with table headers for sorting, pagination controls, and action buttons.
        "Edit" and "Delete" buttons now perform frontend-only state updates.
      </p>

      <div className="mb-8">
        <Table<User>
          data={users}
          columns={userColumns}
          pageSize={5}
          initialSortBy="name"
          initialSortDirection="asc"
          caption="User Management Table"
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Table with Fewer Rows (No Pagination)</h3>
      <p className="mb-4 text-gray-600">
        This table has fewer rows than the page size, so pagination controls should not appear.
      </p>
      <Table<User>
        data={users.slice(0, 3)}
        columns={userColumns}
        pageSize={5}
        caption="Small User Table"
      />

      {editingUser && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit User: ${editingUser.name}`}
          primaryButtonText="Save Changes"
          onPrimaryButtonClick={handleSaveEdit}
          secondaryButtonText="Cancel"
          onSecondaryButtonClick={() => setIsEditModalOpen(false)}
        >
          <div className="space-y-4">
            <Input
              label="Name"
              name="name"
              value={editFormData.name}
              onChange={handleEditFormChange}
              data-testid="edit-user-name"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={editFormData.email}
              onChange={handleEditFormChange}
              data-testid="edit-user-email"
            />
            <Select
              label="Role"
              name="role"
              options={roleOptions}
              value={editFormData.role}
              onChange={handleEditFormChange}
              data-testid="edit-user-role"
            />
            <Select
              label="Status"
              name="status"
              options={statusOptions}
              value={editFormData.status}
              onChange={handleEditFormChange}
              data-testid="edit-user-status"
            />
          </div>
        </Modal>
      )}

      {userToDelete && (
        <Modal
          isOpen={isDeleteConfirmationModalOpen}
          onClose={cancelDelete}
          title="Confirm Deletion"
          primaryButtonText="Delete"
          onPrimaryButtonClick={confirmDelete}
          secondaryButtonText="Cancel"
          onSecondaryButtonClick={cancelDelete}
        >
          <p className="mb-4 text-gray-700" data-testid="delete-confirmation-message">
            Are you sure you want to delete user '<strong>{userToDelete.name}</strong>'? This action cannot be undone.
          </p>
        </Modal>
      )}
    </section>
  );
};

export default TablesTestPage;