package org.zerock.domain;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class CrudVO {
	private int bno;	   //pk
	private String title;  //����
	private	String text;   //����
	private String writer; //�ۼ���
	private Date date;	   //�ۼ�����
	private String t;
	private List<BoardAttachVO> AttachList;
}
