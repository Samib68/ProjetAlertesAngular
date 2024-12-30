package edu.miage.springboot.utils.mappers;

import edu.miage.springboot.dao.entities.FileEntity;
import edu.miage.springboot.web.dtos.FileDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-30T20:31:01+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class FileMapperImpl implements FileMapper {

    @Override
    public FileEntity dtoToEntity(FileDTO dto) {
        if ( dto == null ) {
            return null;
        }

        FileEntity fileEntity = new FileEntity();

        fileEntity.setId( dto.getId() );
        fileEntity.setName( dto.getName() );

        return fileEntity;
    }

    @Override
    public FileDTO entityToDto(FileEntity entity) {
        if ( entity == null ) {
            return null;
        }

        FileDTO fileDTO = new FileDTO();

        fileDTO.setId( entity.getId() );
        fileDTO.setName( entity.getName() );

        return fileDTO;
    }

    @Override
    public List<FileEntity> dtosToEntities(List<FileDTO> dtos) {
        if ( dtos == null ) {
            return null;
        }

        List<FileEntity> list = new ArrayList<FileEntity>( dtos.size() );
        for ( FileDTO fileDTO : dtos ) {
            list.add( dtoToEntity( fileDTO ) );
        }

        return list;
    }

    @Override
    public List<FileDTO> entitiesToDtos(List<FileEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<FileDTO> list = new ArrayList<FileDTO>( entities.size() );
        for ( FileEntity fileEntity : entities ) {
            list.add( entityToDto( fileEntity ) );
        }

        return list;
    }
}
