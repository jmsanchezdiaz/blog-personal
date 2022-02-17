import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link, List, ListIcon, ListItem } from '@chakra-ui/react';
import React from 'react';
import links from '../../helpers/socialsLinks';

const SocialMediaLinks = (props) => {
  return (
    <List {...props}>
      {links.map(({ href, content }, i) => (
        <ListItem key={i} _hover={{ color: 'blue.700' }}>
          <ListIcon boxSize={5} as={ExternalLinkIcon} />
          <Link role='link' target='_blank' href={href}>
            {content}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default SocialMediaLinks;
