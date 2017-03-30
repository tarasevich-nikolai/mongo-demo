package com.tarasevich.nikolai.repository;

import com.tarasevich.nikolai.domain.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * @author Nikolai Tarasevich
 */
public interface CustomerRepository extends MongoRepository<Customer, Long> {

    public Customer findByFirstName(String firstName);

    public List<Customer> findByLastName(String lastName);
}
