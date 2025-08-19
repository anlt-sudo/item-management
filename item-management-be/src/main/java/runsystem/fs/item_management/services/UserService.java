package runsystem.fs.item_management.services;

import runsystem.fs.item_management.entities.User;

public interface UserService {
    User createUser(User user);
    java.util.Optional<User> getUserById(int id);
    java.util.List<User> getAllUsers();
    User updateUser(int id, User userDetails);
    void deleteUser(int id);
    java.util.Optional<User> getByEmail(String email);
}
