USE [quotejoli]
GO

ALTER TABLE [dbo].[Publisher] DROP CONSTRAINT [FK_Publisher_Country]
GO

/****** Object:  Table [dbo].[Publisher]    Script Date: 1/25/2017 4:40:57 PM ******/
DROP TABLE [dbo].[Publisher]
GO

/****** Object:  Table [dbo].[Publisher]    Script Date: 1/25/2017 4:40:57 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Publisher](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](max) NOT NULL,
	[city] [varchar](max) NOT NULL,
	[state] [varchar](max) NOT NULL,
	[countryId] [int] NOT NULL,
 CONSTRAINT [PK_Publisher] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[Publisher]  WITH CHECK ADD  CONSTRAINT [FK_Publisher_Country] FOREIGN KEY([countryId])
REFERENCES [dbo].[Country] ([id])
GO

ALTER TABLE [dbo].[Publisher] CHECK CONSTRAINT [FK_Publisher_Country]
GO

