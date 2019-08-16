package lk.vsc.repository;

import lk.vsc.entity.Employee;
import lk.vsc.entity.MakeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MakeModelRepository  extends JpaRepository<MakeModel,Integer> {

    @Query(value = "from MakeModel where makeName=?1")
    List<MakeModel> getModelsByMake(String modelName);

    @Query(value = "select makeModelId from MakeModel where modelName = :modelName and makeName = :makelName")
    Object searchMakeModelId(@Param("modelName") String modelName,@Param("makelName") String makelName);
}
