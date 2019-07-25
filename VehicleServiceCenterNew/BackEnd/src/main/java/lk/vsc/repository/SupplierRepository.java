package lk.vsc.repository;


import lk.vsc.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupplierRepository extends JpaRepository<Supplier,Integer> {
    @Query(value = "from Supplier where supplierId=?1")
    Supplier searchBySupplierNumber(int supplierId);

}

