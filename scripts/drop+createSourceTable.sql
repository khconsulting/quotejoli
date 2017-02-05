USE [quotejoli]
GO

/****** Object:  Table [dbo].[Source]    Script Date: 1/25/2017 4:44:50 PM ******/
DROP TABLE [dbo].[Source]
GO

/****** Object:  Table [dbo].[Source]    Script Date: 1/25/2017 4:44:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Source](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](4000) NOT NULL,
	[year] [int] NOT NULL,
	[yearOriginal] [int] NULL,
	[type] [smallint] NOT NULL,
	[publisherId] [int] NOT NULL,
	[volume] [varchar](10) NULL,
 CONSTRAINT [PK_Source] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

