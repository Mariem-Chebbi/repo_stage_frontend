export interface Demo {
    _id?: string;  // Optional since it might not be available during creation
    
    // First Step
    S1_FS_Title: string;
    S1_FS_Description: string;
    S1_FS_Image: File | string;  // Use `File` for upload, `string` for the URL
    S1_SS_Introduction: string;
    S1_SS_Image: File | string;
  
    // Second Step
    S2_FS_Title: string;
    S2_SS_Title: string;
    S2_SS_Benefits1: string;
    S2_SS_Benefits2: string;
    S2_SS_Benefits3: string;
    S2_SS_Benefits4: string;
    S2_SS_Limitations1: string;
    S2_SS_Limitations2: string;
    S2_SS_Limitations3: string;
    S2_SS_Limitations4: string;
  
    // Third Step
    S3_FS_Title: string;
    S3_FS_Subtitle: string;
    S3_FS_Description: string;
    S3_FS_Image: File | string;
    S3_SS_Title: string;
    S3_SS_Subtitle: string;
    S3_SS_Image: File | string;
    S3_TS_Title: string;
    S3_TS_Image: File | string;
    S3_TS_Ex_Text1: string;
    S3_TS_Ex_Text2: string;
    S3_TS_Ex_Text3: string;
    S3_TS_Ex_Text4: string;
    S3_FoS_Title: string;
    S3_FoS_Subtitle: string;
    S3_FoS_Text1: string;
    S3_FoS_Text2: string;
    S3_FoS_Text3: string;
    S3_FoS_Text4: string;
    S3_FoS_Text5: string;
    S3_FoS_Text6: string;
    S3_FoS_Text7: string;
    S3_FoS_Text8: string;
    S3_FoS_Text9: string;
    S3_FoS_Text10: string;
    S3_FiS_Title_center: string;
    S3_FiS_Title1: string;
    S3_FiS_Subtitle1: string;
    S3_FiS_Title2: string;
    S3_FiS_Subtitle2: string;
    S3_FiS_Title3: string;
    S3_FiS_Subtitle3: string;
    S3_FiS_Title4: string;
    S3_FiS_Subtitle4: string;
    S3_SIS_Title_center: string;
    S3_SIS_Title1: string;
    S3_SIS_Subtitle1: string;
    S3_SIS_Title2: string;
    S3_SIS_Subtitle2: string;
    S3_SIS_Title3: string;
    S3_SIS_Subtitle3: string;
    S3_SIS_Title4: string;
    S3_SIS_Subtitle4: string;
    S3_SIS_Title5: string;
    S3_SIS_Subtitle5: string;
    S3_SES_Title_center: string;
    S3_SES_Title1: string;
    S3_SES_Subtitle1: string;
    S3_SES_Title2: string;
    S3_SES_Subtitle2: string;
    S3_SES_Title3: string;
    S3_SES_Subtitle3: string;
    S3_SES_Title4: string;
    S3_SES_Subtitle4: string;
  
    // Fourth Step
    S4_FS_Title: string;
    S4_FS_Subtitle: string;
    S4_FS_Description: string;
    S4_FS_Image: File | string;
    S4_SS_Description: string;
    S4_SS_Image: File | string;
    S4_TS_Title: string;
    S4_TS_Subtitle: string;
    S4_TS_Image: File | string;
  
    // Fifth Step
    S5_FS_Title: string;
    S5_FS_Description: string;
    S5_FS_Image: File | string;
    S5_SS_Title1: string;
    S5_SS_Description1: string;
    S5_SS_Image1: File | string;
    S5_SS_Title2: string;
    S5_SS_Description2: string;
    S5_SS_Image2: File | string;
    S5_SS_Title3: string;
    S5_SS_Description3: string;
    S5_SS_Image3: File | string;
    S5_SS_Title4: string;
    S5_SS_Description4: string;
    S5_SS_Image4: File | string;
    S5_SS_Title5: string;
    S5_SS_Description5: string;
    S5_SS_Image5: File | string;
    S5_SS_Title6: string;
    S5_SS_Description6: string;
    S5_SS_Image6: File | string;
  
    // Sixth Step
    S6_Title: string;
    S6_Subtitle: string;
    S6_FS_Description_prob1: string;
    S6_FS_Description6_solu1: string;
    S6_SS_Description_prob2: string;
    S6_SS_Description6_solu2: string;
    S6_TS_Description_prob3: string;
    S6_TS_Description6_solu3: string;
    S6_FOS_Description_prob4: string;
    S6_FOS_Description6_solu4: string;
  
    // Footer
    Footer_Desc: string;
  }
  