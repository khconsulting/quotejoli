USE [quotejoli]
GO

ALTER TABLE [dbo].[SourceTag] DROP CONSTRAINT [FK_SourceTag_Tag]
GO

ALTER TABLE [dbo].[SourceTag] DROP CONSTRAINT [FK_SourceTag_Quote]
GO

/****** Object:  Table [dbo].[SourceTag]    Script Date: 1/25/2017 4:45:33 PM ******/
DROP TABLE [dbo].[SourceTag]
GO

/****** Object:  Table [dbo].[SourceTag]    Script Date: 1/25/2017 4:45:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SourceTag](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[quoteId] [int] NOT NULL,
	[tagId] [int] NOT NULL,
 CONSTRAINT [PK_SourceTag] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[SourceTag]  WITH CHECK ADD  CONSTRAINT [FK_SourceTag_Quote] FOREIGN KEY([quoteId])
REFERENCES [dbo].[Quote] ([id])
GO

ALTER TABLE [dbo].[SourceTag] CHECK CONSTRAINT [FK_SourceTag_Quote]
GO

ALTER TABLE [dbo].[SourceTag]  WITH CHECK ADD  CONSTRAINT [FK_SourceTag_Tag] FOREIGN KEY([tagId])
REFERENCES [dbo].[Tag] ([id])
GO

ALTER TABLE [dbo].[SourceTag] CHECK CONSTRAINT [FK_SourceTag_Tag]
GO

