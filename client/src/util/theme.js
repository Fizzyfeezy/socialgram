export default {
    palette :{
      primary : {
        light : '#6d4c41',
        main : '#5d4037',
        dark : '#4e342e',
        contrastText : '#fff'
      },
      secondary : {
        light : '#ff6333',
        main : '#ff3d00',
        dark : '#b22a00',
        contrastText : '#fff'
      }
    },
    spreadThis : {
      typography : {
        useNextVariants : true
      },
      form : {
        textAlign : 'center',
        opacity : 0.9
      },
      image : {
        margin : '20px auto 20px auto'
      },
      pageTitle : {
        fontSize : 18,
        textTransform : "uppercase",
        fontWeight: 600,
        color : '#5d4037',
        margin : '10px auto 10px auto',
        width : 350
      },
      boxTitle : {
        backgroundColor : '#e0e0e0',
        height : '500px',
        margin : '30px auto 20px auto',
        borderRadius : 10,
        opacity : 0.95
      },
      textField : {
        margin : '20px auto 20px auto',
        width : 300
      },
      button : {
        margin : '20px auto 10px auto',
        width : 300,
        position : 'relative'
      },
      customError : {
        color : "red",
        fontSize : '0.8rem',
        marginTop : 10
      },
      progress : {
        position : 'absolute'
      },
      invisibleSeparator : {
        border : 'none',
        margin : 4
      },
      visibleSeparator : {
          width : '100%',
          borderBottom : '1px, solid rgba(0,0,0,0.1)',
          marginBottom : 20
      },
      paper : {
        padding : 20
      },
      profile : {
          '& .image-wrapper' : {
              textAlign : 'center',
              position : 'relative',
          },
          '& .profile-image' : {
              width : 200,
              height : 200,
              objectFit : 'cover',
              maxWidth : '100%',
              borderRadius : '50%'
          },
          '& .profile-details' : {
              textAlign : 'center',
              '& span, svg' : {
                  verticalAlign : 'middle'
              },
              '& a' : {
                  color : '#6d4c41'
              }
          },
          '& hr' : {
              border : 'none',
              margin : '0 0 10px 0'
          },
          '& svg.button' : {
            '& hover' : {
                cursor : 'pointer'
            }
          }
        },
        buttons : {
          textAlign : 'center',
          '& a' : {
              margin : '20px 10px'
          }
      }
    }
  }