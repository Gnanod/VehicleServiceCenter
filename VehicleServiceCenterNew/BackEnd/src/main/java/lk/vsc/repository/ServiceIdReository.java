package lk.vsc.repository;

import lk.vsc.entity.ServiceJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ServiceIdReository extends JpaRepository<ServiceJob,String> {

    @Query(value = " select service_job_id from print_job_order order by 1 desc limit 1",nativeQuery = true)
    Object getLastId();
}
