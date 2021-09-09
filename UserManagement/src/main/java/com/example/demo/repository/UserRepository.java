package com.example.demo.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.demo.model.User;
import org.springframework.data.repository.query.Param;
public interface UserRepository extends JpaRepository<User,Integer>{

    //native query
    @Query(value="Select * from usermanagement.user_app  order by date desc;", nativeQuery= true)
    public List<User> getAllUserBirthDateDesc();

    @Query(value="SELECT gender from usermanagement.user_app GROUP BY gender;", nativeQuery= true)
    public List<User> getGenderTypes();
}




