package runsystem.fs.item_management.services;

import org.springframework.web.multipart.MultipartFile;

public interface UploadService {
	String uploadImage(MultipartFile file);
}
