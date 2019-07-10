package lk.vsc.repository;


import lk.vsc.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VehicleRepository extends JpaRepository<Vehicle,Integer> {
    @Query(value = "from Vehicle  where vehicleNumber=?1")
    Vehicle searchByVehicleNum(String vehicle_number);
     
}
