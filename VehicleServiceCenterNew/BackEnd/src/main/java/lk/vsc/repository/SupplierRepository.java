package lk.vsc.repository;


import lk.vsc.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier,Integer> {

    @Query(value = "from Supplier where supplierId=?1")
    Supplier searchBySupplierNumber(int supplierId);

    @Query(value = "select distinct companyName from Supplier  ")
    List<Object[]> findAllCompanies();

    @Query(value = "select agentName from Supplier where companyName = :supplierCompany")
    List<Object[]> getSupplierNames(@Param("supplierCompany") String supplierCompany);


}


