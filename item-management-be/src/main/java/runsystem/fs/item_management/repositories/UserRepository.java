package runsystem.fs.item_management.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import runsystem.fs.item_management.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    java.util.Optional<User> findByEmail(String email);
}
